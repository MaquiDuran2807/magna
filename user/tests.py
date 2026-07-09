from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import User


class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'email': 'test@example.com',
            'password': 'TestPass123!',
            're_password': 'TestPass123!',
            'first_name': 'Test',
            'last_name': 'User',
        }
        self.user = User.objects.create_user(
            email='existing@example.com',
            password='ExistingPass123!',
            first_name='Existing',
            last_name='User',
        )

    def test_register_user(self):
        response = self.client.post('/auth/users/', self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['email'], self.user_data['email'])

    def test_register_duplicate_email(self):
        data = self.user_data.copy()
        data['email'] = 'existing@example.com'
        response = self.client.post('/auth/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_jwt_login(self):
        response = self.client.post('/auth/jwt/create/', {
            'email': 'existing@example.com',
            'password': 'ExistingPass123!',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_jwt_login_wrong_password(self):
        response = self.client.post('/auth/jwt/create/', {
            'email': 'existing@example.com',
            'password': 'wrongpassword',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_jwt_refresh(self):
        login = self.client.post('/auth/jwt/create/', {
            'email': 'existing@example.com',
            'password': 'ExistingPass123!',
        }, format='json')
        response = self.client.post('/auth/jwt/refresh/', {
            'refresh': login.data['refresh'],
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_jwt_verify(self):
        login = self.client.post('/auth/jwt/create/', {
            'email': 'existing@example.com',
            'password': 'ExistingPass123!',
        }, format='json')
        response = self.client.post('/auth/jwt/verify/', {
            'token': login.data['access'],
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_authenticated_user_profile(self):
        login = self.client.post('/auth/jwt/create/', {
            'email': 'existing@example.com',
            'password': 'ExistingPass123!',
        }, format='json')
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {login.data["access"]}')
        response = self.client.get('/auth/users/me/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'existing@example.com')

    def test_unauthenticated_access_denied(self):
        response = self.client.get('/auth/users/me/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_users_authenticated(self):
        login = self.client.post('/auth/jwt/create/', {
            'email': 'existing@example.com',
            'password': 'ExistingPass123!',
        }, format='json')
        self.client.credentials(HTTP_AUTHORIZATION=f'JWT {login.data["access"]}')
        response = self.client.get('/auth/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_jwt_login_returns_tokens(self):
        response = self.client.post('/auth/jwt/create/', {
            'email': 'existing@example.com',
            'password': 'ExistingPass123!',
        }, format='json')
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
