#!/usr/bin/env python3
"""Build the site: content/ + templates/ + static/  ->  _site/

    python build.py            build into _site/
    python build.py --serve    build, then serve _site/ at http://localhost:8000
    python build.py --check    build, then verify every internal link/image resolves

How content maps to pages (see CLAUDE.md for the full guide):
  content/site.yml           global settings, collections config, redirects
  content/pages/<name>.md    one top-level page each -> /<name>/   (home.md -> /)
  content/<collection>/<id>.md   one detail page per item -> url pattern from site.yml
  content/<name>.yml         data lists (updates, prototypes, courses) usable by any template
"""
import argparse
import functools
import hashlib
import http.server
import re
import shutil
import sys
from html.parser import HTMLParser
from pathlib import Path

import markdown as md_lib
import yaml
from jinja2 import Environment, FileSystemLoader, StrictUndefined
from markupsafe import Markup

ROOT = Path(__file__).resolve().parent
CONTENT = ROOT / "content"
TEMPLATES = ROOT / "templates"
STATIC = ROOT / "static"
OUT = ROOT / "_site"

# Fields the build fills in on every collection item; content files must not set them.
RESERVED = {"id", "url", "collection", "body", "body_class", "source", "papers", "project_item"}
FRONT_MATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n?(.*)\Z", re.S)
errors = []


def fail(msg):
    errors.append(msg)


# ---------------------------------------------------------------- images

@functools.lru_cache(maxsize=None)
def image_size(src):
    """(width, height) of a JPEG or PNG under static/images/, read from the file header.
    Used by the photo gallery to give each photo its natural aspect ratio."""
    path = STATIC / "images" / src
    if not path.is_file():
        fail(f"image not found: static/images/{src}")
        return (4, 3)
    data = path.read_bytes()
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return (int.from_bytes(data[16:20], "big"), int.from_bytes(data[20:24], "big"))
    i = 2  # JPEG: walk the segments until a start-of-frame marker
    while i + 9 < len(data) and data[i] == 0xFF:
        marker, length = data[i + 1], int.from_bytes(data[i + 2:i + 4], "big")
        if 0xC0 <= marker <= 0xCF and marker not in (0xC4, 0xC8, 0xCC):
            return (int.from_bytes(data[i + 7:i + 9], "big"), int.from_bytes(data[i + 5:i + 7], "big"))
        i += 2 + length
    fail(f"can't read the size of static/images/{src} (only JPEG and PNG are supported)")
    return (4, 3)


# ---------------------------------------------------------------- markdown

def asset(path):
    """URL of a file in static/ plus ?v=<content hash>, so browsers fetch the new copy after a deploy.
    For a .js file the hash covers every .js file next to it (modules import their siblings with the same ?v)."""
    f = STATIC / path.lstrip("/")
    files = sorted(f.parent.glob("*.js")) if f.suffix == ".js" else [f]
    if not f.is_file():
        raise SystemExit(f"asset: {path} not found in static/")
    digest = hashlib.sha1(b"".join(p.read_bytes() for p in files)).hexdigest()[:8]
    return f"{path}?v={digest}"


def render_md(text, inline=False):
    """Markdown -> HTML. inline=True strips the wrapping <p> for short fields."""
    if not text:
        return Markup("")
    html = md_lib.markdown(str(text).strip(), extensions=["extra", "toc", "sane_lists"])
    if inline and html.startswith("<p>") and html.endswith("</p>") and html.count("<p>") == 1:
        html = html[3:-4]
    return Markup(html)


def read_md_file(path):
    """Return (front_matter_dict, body_markdown) for a .md file."""
    text = path.read_text(encoding="utf-8")
    m = FRONT_MATTER.match(text)
    if not m:
        return {}, text
    meta = yaml.safe_load(m.group(1)) or {}
    if not isinstance(meta, dict):
        fail(f"{path.relative_to(ROOT)}: front matter must be key: value pairs")
        meta = {}
    return meta, m.group(2)


def visible(items):
    """Drop entries marked hidden/noindex/draft from a list of dicts."""
    return [i for i in items if not (isinstance(i, dict) and
                                     (i.get("hidden") or i.get("noindex") or i.get("draft")))]


# ---------------------------------------------------------------- loading

def load_site():
    site = yaml.safe_load((CONTENT / "site.yml").read_text(encoding="utf-8"))
    site["url"] = site["url"].rstrip("/")
    return site


def load_data():
    """Every content/*.yml except site.yml, keyed by file name. Hidden entries removed."""
    data = {}
    for path in sorted(CONTENT.glob("*.yml")):
        if path.name == "site.yml":
            continue
        value = yaml.safe_load(path.read_text(encoding="utf-8")) or []
        data[path.stem] = visible(value) if isinstance(value, list) else value
    return data


def load_pages():
    pages = []
    for path in sorted((CONTENT / "pages").glob("*.md")):
        meta, body = read_md_file(path)
        if meta.get("draft"):
            continue
        name = path.stem
        page = {"template": "page.html", "title": name.title(), **meta}
        page["name"] = name
        page["url"] = meta.get("url") or ("/" if name == "home" else f"/{name}/")
        page["body"] = render_md(body)
        page["body_class"] = f"page-{name} {meta.get('class', '')}".strip()
        page["source"] = str(path.relative_to(ROOT))
        pages.append(page)
    pages.sort(key=lambda p: p["url"] != "/")  # home first (sitemap order)
    return pages


def load_collection(name, cfg):
    items = []
    for path in sorted((CONTENT / name).glob("*.md")):
        meta, body = read_md_file(path)
        if meta.get("draft"):
            continue
        item_id = path.stem
        for key in RESERVED & meta.keys():
            fail(f"{path.relative_to(ROOT)}: '{key}' is set by the build; use a different field name")
        item = {"template": cfg["template"], **meta}
        item["id"] = item_id
        item["collection"] = name
        item["url"] = cfg["url"].format(id=item_id)
        item["body"] = render_md(body)
        singular = cfg.get("singular", name.rstrip("s"))
        item["body_class"] = f"page-{singular} {singular}-{item_id} {meta.get('class', '')}".strip()
        item["source"] = str(path.relative_to(ROOT))
        for field in cfg.get("required", []):
            if not item.get(field):
                fail(f"{item['source']}: missing required field '{field}'")
        if item.get("image") and not (STATIC / "images" / item["image"]).is_file():
            fail(f"{item['source']}: image not found: static/images/{item['image']}")
        items.append(item)

    # sort: "order" ascending, "-date" descending; items missing the key go last.
    key = cfg.get("sort", "id")
    reverse = key.startswith("-")
    key = key.lstrip("-")
    has = sorted((i for i in items if i.get(key) is not None), key=lambda i: i[key], reverse=reverse)
    return has + [i for i in items if i.get(key) is None]


def link_related(collections, site):
    """papers point at a project with `project: <id>`; projects get `.papers` automatically."""
    projects = {p["id"]: p for p in collections.get("projects", [])}
    for p in projects.values():
        p["papers"] = []
    categories = [c["id"] for c in site["collections"]["papers"].get("categories", [])]
    for paper in collections.get("papers", []):
        if categories and paper.get("category") not in categories:
            fail(f"{paper['source']}: category '{paper.get('category')}' not one of {categories}")
        pid = paper.get("project")
        if not pid:
            continue
        if pid not in projects:
            fail(f"{paper['source']}: project '{pid}' does not exist in content/projects/")
            continue
        paper["project_item"] = projects[pid]
        if not (paper.get("hidden") or paper.get("noindex")):
            projects[pid]["papers"].append(paper)


# ---------------------------------------------------------------- writing

def write(url, html):
    """Write html for a URL: '/x/' -> _site/x/index.html, '/x.html' -> _site/x.html."""
    target = OUT / url.lstrip("/")
    if url.endswith("/"):
        target = target / "index.html"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(html, encoding="utf-8")


def build():
    site = load_site()
    data = load_data()
    pages = load_pages()
    collections = {name: load_collection(name, cfg) for name, cfg in site["collections"].items()}
    link_related(collections, site)

    env = Environment(loader=FileSystemLoader(TEMPLATES), undefined=StrictUndefined,
                      autoescape=True, trim_blocks=True, lstrip_blocks=True)
    env.filters["md"] = render_md
    env.filters["mdi"] = lambda text: render_md(text, inline=True)
    env.filters["plain"] = lambda text, n=160: _plain(text, n)
    env.filters["image_size"] = image_size
    env.filters["asset"] = asset

    nav = sorted((p for p in pages if p.get("nav") and not p.get("noindex")), key=lambda p: p["nav"])
    # Listed collections exclude hidden/noindex items; detail pages are still built for them.
    listed = {name: visible(items) for name, items in collections.items()}
    common = {"site": site, "nav": nav, "data": data, "collections": listed}

    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(STATIC, OUT)

    rendered = []  # every built page/item; non-noindex ones go in the sitemap
    for page in pages:
        if page.get("data") and page["data"] not in data:
            fail(f"{page['source']}: data file content/{page['data']}.yml not found")
        items = data.get(page["data"], []) if page.get("data") else []
        _render(env, page, {**common, "page": page, "items": items})
        rendered.append(page)
    for name, items in collections.items():
        for item in items:
            _render(env, item, {**common, "page": item})
            rendered.append(item)

    # Redirect stubs: explicit ones from site.yml + old per-item URLs from collection config.
    redirects = dict(site.get("redirects") or {})
    for name, cfg in site["collections"].items():
        for old in cfg.get("redirect_from", []):
            for item in collections[name]:
                redirects[old.format(id=item["id"])] = item["url"]
    real_urls = {p["url"] for p in rendered}
    for old in redirects:
        if old in real_urls or old + "/" in real_urls:
            fail(f"redirect from {old} would overwrite a real page; remove it from site.yml")
    redirect_tpl = env.get_template("redirect.html")
    for old, new in redirects.items():
        write(old if old.endswith((".html", "/")) else old + "/",
              redirect_tpl.render(site=site, target=new))

    sitemap_urls = [p["url"] for p in rendered
                    if not p.get("noindex") and p["url"].endswith("/")]
    write("/sitemap.xml", env.get_template("sitemap.xml").render(site=site, urls=sitemap_urls))
    write("/robots.txt", f"User-agent: *\nAllow: /\n\nSitemap: {site['url']}/sitemap.xml\n")

    if errors:
        print("Build failed:\n  " + "\n  ".join(errors), file=sys.stderr)
        sys.exit(1)
    print(f"Built {len(rendered)} pages, {len(redirects)} redirects -> {OUT.relative_to(ROOT)}/")


def _render(env, page, context):
    try:
        template = env.get_template(page["template"])
    except Exception as exc:  # TemplateNotFound or syntax error
        fail(f"{page['source']}: template '{page['template']}': {exc}")
        return
    try:
        write(page["url"], template.render(**context))
    except Exception as exc:
        fail(f"{page['source']} (template {page['template']}): {type(exc).__name__}: {exc}")


def _plain(text, n):
    """Markdown/HTML -> plain text, truncated; for meta descriptions."""
    s = re.sub(r"<[^>]+>", "", str(render_md(text)))
    s = re.sub(r"\s+", " ", s).strip()
    return s if len(s) <= n else s[: n - 1].rsplit(" ", 1)[0] + "…"


# ---------------------------------------------------------------- check / serve

class _Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []

    def handle_starttag(self, tag, attrs):
        for k, v in attrs:
            if k in ("href", "src", "data") and v:
                self.refs.append(v)


def check():
    """Verify every internal href/src in _site resolves to a file."""
    broken = []
    for html in OUT.rglob("*.html"):
        parser = _Links()
        parser.feed(html.read_text(encoding="utf-8"))
        for ref in parser.refs:
            if re.match(r"^([a-z]+:|//|#)", ref):
                continue  # external, mailto:, or same-page anchor
            path = ref.split("#")[0].split("?")[0]
            target = (OUT / path.lstrip("/")) if path.startswith("/") else (html.parent / path)
            if not (target.is_file() or (target / "index.html").is_file()):
                broken.append(f"{html.relative_to(OUT)}: {ref}")
    if broken:
        print("Broken internal links:\n  " + "\n  ".join(broken), file=sys.stderr)
        sys.exit(1)
    print("Link check passed.")


def serve(port=8000):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(OUT))
    print(f"Serving http://localhost:{port}  (Ctrl+C to stop)")
    http.server.ThreadingHTTPServer(("localhost", port), handler).serve_forever()


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--serve", action="store_true", help="serve _site/ after building")
    ap.add_argument("--check", action="store_true", help="check internal links after building")
    ap.add_argument("--port", type=int, default=8000)
    args = ap.parse_args()
    build()
    if args.check:
        check()
    if args.serve:
        serve(args.port)
