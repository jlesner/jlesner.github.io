
# coding: utf-8

# # Portfolio (projects) markdown generator
#
# Reads portfolio.tsv and writes one markdown file per row into ../_portfolio/,
# matching the front matter schema rendered by _includes/project-item.html
# (used on /projects/) and _includes/home-recent-item.html (used on the homepage).
#
# ## TSV columns
#
# rank, title, url_slug, excerpt, image, links, note, status
#
# - `rank` is a small integer, 1 = most recent. It becomes the `order:` front matter field and
#   controls both the position on /projects/ and whether the project makes the homepage's
#   top-10 "Recent Projects" cut. There are no real per-project dates, so `rank` is a manually
#   maintained stand-in for recency -- insert/renumber rows to reflect where a new project belongs.
# - `image` should be a filename that already exists in images/portfolio/.
# - `links` is semicolon-separated "label|icon|url" triples, e.g.
#   "Preprint|fas fa-file-alt|https://example.com/paper.pdf;Video|fab fa-youtube|https://youtu.be/xyz"
#   Use any Font Awesome 5 class for `icon` (the site already loads Font Awesome 5.15.4).
# - `excerpt`, `note`, `status`, and `links` may be left blank. `excerpt` and `note` may contain
#   raw HTML (e.g. an <a> tag), since they're inserted into the page as-is.

import os
import pandas as pd

portfolio = pd.read_csv("portfolio.tsv", sep="\t", header=0)


def yaml_escape(text):
    return str(text).replace("\\", "\\\\").replace('"', '\\"')


for row, item in portfolio.iterrows():
    md_filename = str(item.url_slug) + ".md"

    md = "---\n"
    md += "title: \"" + yaml_escape(item.title) + "\"\n"
    md += "collection: portfolio\n"
    md += "permalink: /portfolio/" + str(item.url_slug) + "/\n"
    md += "id: " + str(item.url_slug) + "\n"
    md += "order: " + str(item["rank"]) + "\n"

    if len(str(item.image)) > 3:
        md += "image: " + str(item.image) + "\n"

    if len(str(item.excerpt)) > 5:
        md += "excerpt: \"" + yaml_escape(item.excerpt) + "\"\n"

    if len(str(item.links)) > 3:
        md += "links:\n"
        for link in str(item.links).split(";"):
            label, icon, url = [part.strip() for part in link.split("|")]
            md += "  - label: \"" + yaml_escape(label) + "\"\n"
            md += "    icon: \"" + icon + "\"\n"
            md += "    url: \"" + yaml_escape(url) + "\"\n"

    if len(str(item.note)) > 5:
        md += "note: \"" + yaml_escape(item.note) + "\"\n"

    if len(str(item.status)) > 5:
        md += "status: \"" + yaml_escape(item.status) + "\"\n"

    md += "---\n"

    out_path = os.path.join("..", "_portfolio", md_filename)
    with open(out_path, "w") as f:
        f.write(md)

    print("Wrote " + out_path)
