# elastic/urls.py
from django.urls import path
from .views import search_articles
from .views import index_article_view

urlpatterns = [
    path('search/', search_articles, name='search_articles'),
    path('index/', index_article_view, name='index_article_view'),
]
