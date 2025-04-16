---
layout: base.njk
title: Jonas Raneryd Imaizumi - That's me
---

By day, I wrangle code and engineering teams as Head of Development at Mediaflow. By night, I've fallen down a fascinating rabbit hole of AI-assisted programming that's completely transformed how I build software. This site is living proof—I "wrote" it by having conversations with an AI, not by typing a single line of code myself. Join me as I document this strange new world where the line between human and machine creativity blurs, and where a well-crafted prompt can accomplish in minutes what used to take days.

## Latest Posts

{% set posts = collections.posts | reverse %}
{% for post in posts %}
{% if loop.index <= 3 %}
- [{{ post.data.title }}]({{ post.url }}) - {{ post.date | date }}
{% endif %}
{% endfor %}

[View all posts](/posts/)

## Projects

{% set projects = collections.projects %}
{% for project in projects %}
{% if loop.index <= 3 %}
- [{{ project.data.title }}]({{ project.url }}){% if project.data.description %} - {{ project.data.description }}{% endif %}
{% endif %}
{% endfor %}

[View all projects](/projects/) 