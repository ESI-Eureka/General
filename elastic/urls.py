# elastic/urls.py
from django.urls import path
from .views import delete_article_view, search_articles
from .views import index_article_view

urlpatterns = [
    path('search/', search_articles, name='search_articles'),
    path('index/', index_article_view, name='index_article_view'),
    path('delete/', delete_article_view, name='delete_article_view'),
]
