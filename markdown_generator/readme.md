# Markdown generators

Adding a new project or paper is: add a row to a TSV, run the matching script, drop the image (if any) in
`images/portfolio/`.

- **Projects** &rarr; edit `portfolio.tsv`, then run `python portfolio.py` (from this directory). Writes one file
  per row into `../_portfolio/`. See the header comment in `portfolio.py` for the column format.
- **Papers** &rarr; edit `publications.tsv`, then run `python publications.py`. Writes one file per row into
  `../_publications/`. See the header comment in `publications.py` for the column format.

Both scripts overwrite any existing file with the same slug, so re-running after editing a TSV row is safe. The
`example-*` row in each TSV is a template — copy it, don't run it as-is (it points at a `paper_url`/`image` that
doesn't exist).

Each new project/paper automatically:
- gets a full page at `/portfolio/<slug>/` or `/publication/<slug>/`,
- appears in the combined `/projects/` or `/papers/` listing,
- and is eligible for the "Recent Projects" (top 10, by `order`) / "Recent Papers" (top 5, by `date`) sections on
  the homepage.

---

`talks.py` / `talks.ipynb` and `presentations.tsv` follow the same TSV-in, markdown-out pattern for `_talks/` and
aren't covered above. The `.ipynb` files are the same scripts as documented Jupyter notebooks, if you'd rather run
them interactively.
