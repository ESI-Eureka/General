# elastic/urls.py
from django.urls import path
from .views import search_articles
from .views import index_article_view
from .views import delete_article_view
from .views import recuperer_article
from .views import mettre_a_jour_article

urlpatterns = [
    path('search/', search_articles, name='search_articles'),
    path('index/', index_article_view, name='index_article_view'),
    path('delete/', delete_article_view, name='delete_article_view'),
    path('viewAll/', recuperer_article, name='recuperer_article'),
    path('maj/', mettre_a_jour_article, name='mettre_a_jour_article'),
]
