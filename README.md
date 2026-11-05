# jlesner.github.io

Personal site of J. (Jay) Lesner: https://jlesner.github.io

A small static site: Markdown/YAML in `content/`, Jinja2 layouts in `templates/`, one stylesheet in
`static/style.css`, and `build.py` to put them together. See [CLAUDE.md](CLAUDE.md) for how to add projects,
papers, and pages, and how to hide or restyle them.

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
.venv/bin/python build.py --serve     # preview at http://localhost:8000
.venv/bin/python build.py --check     # build + verify internal links
```

Pushing to `master` builds and deploys through GitHub Actions (`.github/workflows/deploy.yml`).
