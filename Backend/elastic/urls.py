# elastic/urls.py
from django.urls import path
from .views import search_articles
from .views import index_article_view
from .views import delete_article_view
from .views import recuperer_article
from .views import mettre_jour_article
from .views import index_article_view_fav
from .views import delete_favoris_document
from .views import retrieve_and_save_favorite_articles

urlpatterns = [
    path('search/', search_articles, name='search_articles'),
    path('index/', index_article_view, name='index_article_view'),
    path('delete/', delete_article_view, name='delete_article_view'),
    path('viewAll/', recuperer_article, name='recuperer_article'),
    path('maj/', mettre_jour_article, name='mettre_jour_article'),
    path('index_fav/', index_article_view_fav, name='index_article_fav'),  
    path('delete_favoris_document/', delete_favoris_document, name='delete_favoris_document'),
    path('search_favoris/', retrieve_and_save_favorite_articles, name='search_favoris'),
]
