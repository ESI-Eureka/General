from django.urls import path
from . import views

urlpatterns = [
    path('pdff/', views.upload_files),
]