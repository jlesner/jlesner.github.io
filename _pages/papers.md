---
layout: archive
title: ""
permalink: /papers/
author_profile: true
redirect_from:
  - /publications/
---
{% include base_path %}

{% for category in site.publication_category %}
{% assign title_shown = false %}
{% assign papers = site.publications | where: "category", category[0] | sort: "date" | reverse %}
{% for paper in papers %}
{% unless title_shown %}
<hr style="height: 5px; background-color: black; border: none;">
<h1>{{ category[1].title }}</h1>
{% assign title_shown = true %}
{% endunless %}
{% include paper-item.html paper=paper %}
{% endfor %}
{% endfor %}
