# CLAUDE.md

Personal academic site for J. (Jay) Lesner, deployed at https://jlesner.github.io.
It's a small custom static site: Markdown/YAML content + Jinja2 templates + one CSS file, built by `build.py`.
There is no Jekyll, theme, or JS build step.

## Commands
- Setup (once): `python3 -m venv .venv && .venv/bin/pip install -r requirements.txt`
- Build: `.venv/bin/python build.py` → writes `_site/` (gitignored)
- Build + check internal links/images: `.venv/bin/python build.py --check`
- Preview: `.venv/bin/python build.py --serve` → http://localhost:8000 (rebuild to see changes)
- Deploy: push to `master`; `.github/workflows/deploy.yml` runs `build.py --check` and publishes `_site/`.

Always run `build.py --check` after edits. The build fails with a clear message on missing required fields,
missing images, bad paper categories, unknown project references, and template errors.

## Layout
```
build.py                  the whole build (~300 lines): load content → render templates → write _site/
content/site.yml          name, tagline, URL, collections config, old-URL redirects
content/pages/<name>.md   top-level pages → /<name>/   (home.md → /, 404.md → /404.html)
content/projects/<id>.md  one file per project → /projects/<id>/
content/papers/<id>.md    one file per paper   → /papers/<id>/
content/updates.yml       home page news list
content/prototypes.yml    list shown on /prototypes/
content/courses.yml       list shown on /courses/
templates/                Jinja2 layouts; all extend base.html; shared pieces in _macros.html
static/                   copied as-is to the site root (style.css, images/, files/, favicon, Google verification)
```

## Common tasks

**Add a project:** create `content/projects/<id>.md`. The file name is the URL id.
```yaml
---
title: "Name: Subtitle"
order: 3                      # position on /projects/ (ascending)
featured: true                # also show on the home page
image: projects/foo.png       # path under static/images/
image_caption: optional
summary: One-paragraph Markdown description (used on the card and as the meta description).
links:
  - {label: Preprint, url: "https://..."}
note: Optional Markdown line (advisor, venue status, awards).
status: Optional short line, e.g. "Live 24/7".
---
Optional long write-up in Markdown, shown only on the project's own page.
```

**Add a paper:** create `content/papers/<id>.md` with `title, category (publications|preprints|reports),
date, venue, paper_url, citation` (Markdown, bold the author as `**Lesner, J.**`), optional `summary`, `image`,
`links`, and `project: <project-id>`. Setting `project:` links the paper and project pages to each other; don't
set anything on the project side. The body is usually `## Abstract` + text.

**Add a top-level page:** create `content/pages/<name>.md`:
```yaml
---
title: Talks
template: page.html     # default; or list.html with `data: <yml name>`, or a new template
nav: 6                  # position in the top nav; omit to keep it out of the nav
description: Meta description for search engines.
---
Markdown body.
```

**Visibility keys** (work on pages, projects, and papers; `hidden` also works on entries in the .yml lists):
- no `nav` → page exists and is in the sitemap, but isn't in the nav (pages only)
- `hidden: true` → left off list pages; its own page still exists and is in the sitemap
- `noindex: true` → not listed anywhere, left out of the sitemap, and has `<meta name="robots" content="noindex">`
- `draft: true` → not built at all

**Per-page look:**
1. `style: |` in front matter → CSS injected on that page only.
2. Every `<body>` has classes like `page-projects`, `page-project project-hapo`, plus anything in `class:`;
   target these in `static/style.css`.
3. `template: my-layout.html` → new file in `templates/` that does `{% extends "base.html" %}` and overrides
   `{% block content %}` (also `title` and `head` blocks).

**Redirects:** add `old: new` under `redirects:` in `site.yml`. Old per-item URLs come from `redirect_from`
in each collection's config.

## Conventions
- Write content in Markdown, not HTML. Use the `md` filter in templates (or `mdi` for inline, no `<p>`).
- Templates use `page.get("field")` for optional fields, because undefined variables are errors (StrictUndefined).
- Don't set `id`, `url`, `collection`, `body`, `body_class`, `source`, `papers`, or `project_item` in front matter.
  The build sets them.
- Links are root-relative (`/projects/hapo/`); images are referenced as `/images/<path>`.
- Colors and spacing are CSS variables at the top of `static/style.css`; dark mode is the
  `prefers-color-scheme: dark` block.
- Display name is "J. Lesner"; "Jay Lesner" is the full name (`site.full_name`) used for search metadata.
