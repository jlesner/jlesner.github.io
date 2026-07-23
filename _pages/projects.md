---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
redirect_from:
  - /portfolio
---
{% include base_path %}

{% assign projects = site.portfolio | sort: "order" %}
{% for project in projects %}
  {% include project-item.html project=project index=forloop.index %}
{% endfor %}
