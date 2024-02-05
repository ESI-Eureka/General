from django.contrib.auth.hashers import make_password, check_password
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Account, Role
from .serializers import AccountSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework import status


class SignupView(APIView):
    """
    View class for handling HTTP POST request to create a new user account.
    """

    def post(self, request):
        """
        Handle HTTP POST request to create a new user account.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: The HTTP response object containing the created user account details.

        Raises:
            Account.DoesNotExist: If the email already exists.
            Role.DoesNotExist: If the specified role does not exist.
        """
        
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
        user_id = user.id  # Get the user ID
        user_role = user.role.name  # Get the user's role
        serializer = AccountSerializer(user)        

        return Response({'access_token': access_token,'user_id': user_id,'email': email, 'password': password, 'user_role': user_role}, status=status.HTTP_200_OK)

class LoginView(APIView):
    """
    API view for user login.

    This view handles the user login functionality by validating the provided email and password.
    If the credentials are valid, it returns an access token along with the user ID, email, password, and role.
    If the credentials are invalid, it returns an appropriate error response.

    Methods:
        - post: Handles the POST request for user login.

    Attributes:
        None
    """
    def post(self, request):
        """
        Handle the HTTP POST request to authenticate a user.

        Args:
            request (HttpRequest): The HTTP request object.

        Returns:
            Response: The HTTP response object containing the access token, user ID, email, password, and user role.

        Raises:
            Account.DoesNotExist: If the user account does not exist.
        """
        email = request.data.get('email')
        password = request.data.get('password')

        if not email or not password:
            return Response({'detail': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Account.objects.get(email=email)

            if check_password(password, user.password):
                # Include user ID and role in the response
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                user_id = user.id  # Get the user ID
                user_role = user.role.name  # Get the user's role

                return Response({'access_token': access_token,'user_id': user_id,'email': email, 'password': password, 'user_role': user_role}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        except Account.DoesNotExist:
            return Response({'detail': 'Invalid credentials.'}, status=status.HTTP_404_NOT_FOUND)


    
class AccountViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling user account operations.

    Attributes:
        queryset (QuerySet): The queryset of all accounts.
        serializer_class (Serializer): The serializer class for account serialization.

    Methods:
        create_account: Create a new user account.
        update_account: Update the user account with the provided email and password.
        destroy: Delete an account based on the provided email.
        list_accounts: Retrieve a list of all accounts.
        list_accounts_role: Retrieve a list of accounts based on the given role ID.
    """
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def create_account(self, request):
        """
        Create a new user account.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: The HTTP response object containing the created user account data.

        Raises:
            HTTP 400 Bad Request: If the required fields (email, password, role) are not provided.
            HTTP 400 Bad Request: If the specified role does not exist.
            HTTP 400 Bad Request: If the email already exists.
            HTTP 201 Created: If the user account is successfully created.
        """
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
        """
        Update the user account with the provided email and password.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: The HTTP response object indicating the status of the account update.
        """
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        current_email = request.data.get('current_email', '')

        print("current-email : ",current_email)

        if not current_email :
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
            if not (check_password(password, user.password)):
                user.password = password

        user.save()

        return Response({'detail': 'Account updated successfully.'}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        """
        Delete an account based on the provided email.

        Args:
            request (Request): The HTTP request object.
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            Response: The HTTP response object.

        Raises:
            None.
        """
        email = request.data.get('email', '')
        # if password:
        #     password = request.data.get('password', '')

        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = Account.objects.get(email=email)
        except Account.DoesNotExist:
            return Response({'detail': 'User does not exist.'}, status=status.HTTP_404_NOT_FOUND)

        # if not check_password(password, user.password):
        #     return Response({'detail': 'Incorrect password.'}, status=status.HTTP_401_UNAUTHORIZED)

        user.delete()

        return Response({'detail': 'Account deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)

    def list_accounts(request):
        """
        Retrieve a list of all accounts.

        Args:
            request (HttpRequest): The HTTP request object.

        Returns:
            Response: The HTTP response object containing the serialized account data.
        """
        accounts_data = Account.objects.all()
        serializer = AccountSerializer(accounts_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

        
    def list_accounts_role(self, request, role_id=None):
        """
        Retrieve a list of accounts based on the given role ID.

        Args:
            request (HttpRequest): The HTTP request object.
            role_id (int, optional): The ID of the role. Defaults to None.

        Returns:
            Response: The HTTP response containing the serialized account data.

        Raises:
            Role.DoesNotExist: If the role with the given ID does not exist.
        """
        if role_id:
            try:
                accounts_data = Account.objects.filter(role__id=role_id)
                serializer = AccountSerializer(accounts_data, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Role.DoesNotExist:
                return Response({'detail': 'Role does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Role ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
        


