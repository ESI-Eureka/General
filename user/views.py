
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Account, Role
from .serializers import AccountSerializer

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    # Create a new account
    def create_account(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        role_id = request.data.get('role', '')

        # Check if all required data is provided
        if not email or not password or not role_id:
            return Response({'detail': 'Email and password and role are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Check if the specified role exists
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response({'detail': 'Role does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new account
        user = Account.objects.create(email=email, password=make_password(password), role=role)

        serializer = AccountSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Update account information
    def update_account(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        current_email = request.data.get('current_email', '')
        current_password = request.data.get('current_password', '')
        
        # Check if the current email is provided
        if not current_email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the user with the current email exists
            user = Account.objects.get(email=current_email)
        except Account.DoesNotExist:
            return Response("User doesn't exist", status=status.HTTP_401_UNAUTHORIZED)
        
        # Check the correctness of the provided current password
        if not current_password or not check_password(current_password, user.password):
            return Response("Incorrect current password", status=status.HTTP_401_UNAUTHORIZED)

        # Update email if provided
        if email:
            user.email = email

        # Update password if provided
        if password:
            user.password = password
            
        user.save()

        return Response("Account updated successfully", status=status.HTTP_200_OK)

    # Delete an account
    def destroy(self, request, *args, **kwargs):
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        # Check if email and password are provided
        if not email or not password:
            return Response({'detail': 'Email or password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Retrieve the user with the provided email
        user = Account.objects.get(email=email)
        user.delete()
    
        return Response("Account deleted successfully", status=status.HTTP_204_NO_CONTENT)

    # List all accounts
    def list_accounts(request):
        accounts_data = Account.objects.all()
        return Response(accounts_data, status=status.HTTP_200_OK)

    # Login functionality
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Check if email and password are provided
        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Retrieve the user with the provided email
            user = Account.objects.get(email=email)

            # Check if the password is correct
            if check_password(password, user.password):
                # Password is correct
                # Retrieve the serialized user data
                serializer = self.get_serializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                # Password is incorrect
                return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        except Account.DoesNotExist:
            # User with the provided email does not exist
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)
