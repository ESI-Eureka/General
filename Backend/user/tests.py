import json
from django.test import TestCase  # Import the TestCase class
from django.urls import reverse
from rest_framework import status
from .models import Account, Role

class TestAuthentication(TestCase):
    """
    A test case class for testing authentication functionality.

    Inherits from the TestCase class provided by the Django test framework.
    """

    def setUp(self):
        self.role = Role.objects.get(name='user')
        self.valid_signup_data = {
            'email': 'test@example.com',
            'password': 'testpassword',
            'role': self.role.id
        }
        self.invalid_signup_data = {
            'password': 'testpassword',
            'role': self.role.id
        }
        self.valid_login_data = {
            'email': 'test@example.com',
            'password': 'testpassword',
        }
        self.invalid_login_data = {
            'email': 'test@example.com',
            'password': 'wrongpassword',
        }
        self.signup_url = reverse('signup')
        self.login_url = reverse('login')

    def test_signup_success(self):
        response = self.client.post(self.signup_url, self.valid_signup_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_signup_failure(self):
        response = self.client.post(self.signup_url, self.invalid_signup_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success(self):
        # First, create a user
        self.client.post(self.signup_url, self.valid_signup_data)
        response = self.client.post(self.login_url, self.valid_login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_failure(self):
        response = self.client.post(self.login_url, self.invalid_login_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
