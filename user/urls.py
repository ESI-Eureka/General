from django.urls import path
from .views import AccountViewSet

urlpatterns = [
    path('', AccountViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'destroy','put': 'update_account'}), name='users-CRUD'),
    path('login/', AccountViewSet.as_view({'post': 'login'}), name='user-login'),
    path('role/<int:role_id>/', AccountViewSet.as_view({'get': 'list_accounts_role'}), name='list-users-role'),
]
