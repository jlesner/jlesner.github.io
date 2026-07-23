
# coding: utf-8

# # Publications markdown generator
#
# Reads publications.tsv and writes one markdown file per row into ../_publications/,
# matching the front matter schema rendered by _includes/paper-item.html,
# _layouts/single.html, and the "Recent Papers" section on the homepage.
#
# ## TSV columns
#
# pub_date, title, category, venue, excerpt, citation, url_slug, paper_url, slides_url, image
#
# - `pub_date` must be YYYY-MM-DD. It drives the "Recent Papers" sort on the homepage, so use
#   the real (or best-known) date, not the filename date.
# - `category` must be one of: publications, preprints, reports (see _config.yml's
#   `publication_category`, which controls the section headings on /papers/).
# - `citation` is the full HTML citation string, e.g.
#   "<strong>Lesner, J.</strong>, &amp; Yan, X. (2025). <em>Preparing for IJCAI-2026</em>."
# - `image`, `excerpt`, and `slides_url` may be left blank. `image` should be a filename that
#   already exists in images/portfolio/ (usually the same image used by the matching project).

import os
import pandas as pd

publications = pd.read_csv("publications.tsv", sep="\t", header=0)


def yaml_escape(text):
    return str(text).replace("\\", "\\\\").replace('"', '\\"')


for row, item in publications.iterrows():
    md_filename = str(item.pub_date) + "-" + item.url_slug + ".md"

    md = "---\n"
    md += "title: \"" + yaml_escape(item.title) + "\"\n"
    md += "collection: publications\n"
    md += "category: " + str(item.category) + "\n"
    md += "permalink: /publication/" + str(item.url_slug) + "/\n"
    md += "id: " + str(item.url_slug) + "\n"
    md += "date: " + str(item.pub_date) + "\n"
    md += "venue: \"" + yaml_escape(item.venue) + "\"\n"

    if len(str(item.paper_url)) > 5:
        md += "paperurl: \"" + yaml_escape(item.paper_url) + "\"\n"

    if len(str(item.slides_url)) > 5:
        md += "slidesurl: \"" + yaml_escape(item.slides_url) + "\"\n"

    if len(str(item.image)) > 3:
        md += "image: " + str(item.image) + "\n"

    if len(str(item.excerpt)) > 5:
        # also used as the front-matter excerpt shown on the homepage's "Recent Papers"
        # card -- without it, Jekyll auto-derives an excerpt from the whole Abstract body,
        # which blows up the card layout.
        md += "excerpt: \"" + yaml_escape(item.excerpt) + "\"\n"

    md += "citation: \"" + yaml_escape(item.citation) + "\"\n"
    md += "---\n"

    if len(str(item.excerpt)) > 5:
        md += "\nAbstract\n---\n" + str(item.excerpt) + "\n"

    out_path = os.path.join("..", "_publications", md_filename)
    with open(out_path, "w") as f:
        f.write(md)

    print("Wrote " + out_path)
