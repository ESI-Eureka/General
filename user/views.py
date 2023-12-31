from django.contrib.auth.hashers import make_password, check_password
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Account, Role
from .serializers import AccountSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status


class SignupView(APIView):
    def post(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        role_id = request.data.get('role', '')

        if not email or not password or not role_id:
            return Response({'detail': 'Email, password, and role are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response({'detail': 'Role does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the email already exists
            Account.objects.get(email=email)
            
            return Response({'detail': 'Email already exists.'}, status=status.HTTP_401_UNAUTHORIZED)
        except Account.DoesNotExist:
            pass
        
        user = Account.objects.create(email=email, password=password, role=role)
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)
        serializer = AccountSerializer(user)        

        return Response({'access_token': access_token}, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Account.objects.get(email=email)

            if check_password(password, user.password):
                user = Account.objects.get(email=email)
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)

                return Response({'access_token': access_token}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        except Account.DoesNotExist:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_404_NOT_FOUND)


class RoleView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = Account.objects.get(email=email)
        role = user.role.name
        return Response({'role': role}, status=status.HTTP_200_OK)
    

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def create_account(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        role_id = request.data.get('role', '')

        if not email or not password or not role_id:
            return Response({'detail': 'Email, password, and role are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            role = Role.objects.get(id=role_id)
        except Role.DoesNotExist:
            return Response({'detail': 'Role does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Check if the email already exists
            acc = Account.objects.get(email=email)
            
            return Response({'detail': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        except Account.DoesNotExist:
            pass

        user = Account.objects.create(email=email, password=make_password(password), role=role)
        serializer = AccountSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update_account(self, request):
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        current_email = request.data.get('current_email', '')

        if not current_email:
            return Response({'detail': 'Current email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Account.objects.get(email=current_email)
        except Account.DoesNotExist:
            return Response({'detail': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Check if the email already exists
            Account.objects.get(email=email)
            if (current_email !=email) :
                return Response({'detail': 'Email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        except Account.DoesNotExist:
            pass

        if email:
            user.email = email

        if password:
            user.password = make_password(password)

        user.save()

        return Response({'detail': 'Account updated successfully.'}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        email = request.data.get('email', '')
        # if password:
        #     password = request.data.get('password', '')

        if not email :
            return Response({'detail': 'Email are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Account.objects.get(email=email)
        except Account.DoesNotExist:
            return Response({'detail': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # if not check_password(password, user.password):
        #     return Response({'detail': 'Incorrect password.'}, status=status.HTTP_401_UNAUTHORIZED)

        user.delete()

        return Response({'detail': 'Account deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

    def list_accounts(request):
        accounts_data = Account.objects.all()
        serializer = AccountSerializer(accounts_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

        
    def list_accounts_role(self, request, role_id=None):
        if role_id:
            try:
                accounts_data = Account.objects.filter(role__id=role_id)
                serializer = AccountSerializer(accounts_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Role.DoesNotExist:
                return Response({'detail': 'Role does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Role ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
