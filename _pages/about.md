---
permalink: /
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

I'm a Computer Science Ph.D. student at UC Santa Barbara, advised by Xifeng Yan, applying AI/ML to real-world problems — from LLM-aided database verification to accessible interfaces for retinal implants.

## Updates

<ul class="home__updates">
  <li><span class="home__updates-date">2025-09</span> Graduated with CS M.S. from UC Santa Barbara</li>
  <li><span class="home__updates-date">2025-01</span> <a href="{{ base_path }}/projects#snipdue">SnipDue</a> wins "Best Use of GenAI Award" at SBHacks XI</li>
  <li><span class="home__updates-date">2024-10</span> <a href="{{ base_path }}/projects#aipif">AIPIF</a> presented at ECAI-2024 and PAIS-2024</li>
</ul>
<details class="home__updates-more">
  <summary>Earlier updates</summary>
  <ul class="home__updates">
    <li><span class="home__updates-date">2024-09</span> Started CS M.S. at UC Santa Barbara</li>
    <li><span class="home__updates-date">2024-07</span> <a href="{{ base_path }}/projects#aipif">AIPIF</a> paper accepted at ECAI-2024 and PAIS-2024</li>
    <li><span class="home__updates-date">2024-03</span> Graduated UC Santa Cruz with Honors, Cum Laude</li>
    <li><span class="home__updates-date">2021-09</span> Started CS B.S. at UC Santa Cruz</li>
  </ul>
</details>

## ECAI & PAIS 2024

<div class="home__photo-row">
  <a href="{{ base_path }}/images/image6.jpg"><img src="{{ base_path }}/images/image6.jpg" alt="Presenting the AIPIF paper at ECAI-2024" style="object-position: center 30%;"></a>
  <a href="{{ base_path }}/images/image5.jpg"><img src="{{ base_path }}/images/image5.jpg" alt="Presenting AIPIF to a full room at ECAI-2024" style="object-position: center 45%;"></a>
  <a href="{{ base_path }}/images/image1.jpg"><img src="{{ base_path }}/images/image1.jpg" alt="Demoing AIPIF at the PAIS-2024 demo session" style="object-position: center 35%;"></a>
  <a href="{{ base_path }}/images/image2.jpg"><img src="{{ base_path }}/images/image2.jpg" alt="Explaining the AIPIF system to a visitor at the PAIS-2024 demo session" style="object-position: center 20%;"></a>
</div>

## Recent Projects

<div class="grid__wrapper home__projects-grid">
{% assign recent_projects = site.portfolio | sort: "order" %}
{% for project in recent_projects limit:4 %}
  {% include home-recent-item.html item=project %}
{% endfor %}
</div>

[See all projects &rarr;]({{ base_path }}/projects/)

## Recent Papers

<ul class="recent-papers-list">
{% assign recent_papers = site.publications | where: "category", "publications" | sort: "date" | reverse %}
{% for paper in recent_papers limit:5 %}
  <li><a href="{{ paper.paperurl }}" target="_blank">{{ paper.title }}</a></li>
{% endfor %}
</ul>

[See all papers &rarr;]({{ base_path }}/papers/)
