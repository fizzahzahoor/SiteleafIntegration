---
---

[
    {% for post in site.posts %}
    {
      "title"    : "{{ post.title }}",
      "href"     : "{{ post.url }}",
      "img"      :  "{{ post.img }}",
      "description" : "{{ post.description }}",
      "url"      :   "{{ post.url }}",

      "date"     : {
         "day"   : "{{ post.date | date: "%d" }}",
         "month" : "{{ post.date | date: "%B" }}",
         "year"  : "{{ post.date | date: "%Y" }}"
      }
    }
    {% unless forloop.last %},{% endunless %}
    {% endfor %}
]
