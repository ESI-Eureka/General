from django.urls import path
from .views import AccountViewSet, LoginView, SignupView

urlpatterns = [
    path('', AccountViewSet.as_view({'get': 'list', 'post': 'create', 'delete': 'destroy','put': 'update_account'}), name='users-CRUD'),
    path('login/', LoginView.as_view( ), name='login'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('role/<int:role_id>/', AccountViewSet.as_view({'get': 'list_accounts_role'}), name='list-users-role'),
]
