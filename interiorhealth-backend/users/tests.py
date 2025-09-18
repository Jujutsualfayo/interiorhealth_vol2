
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class UserAuthTests(APITestCase):
	def setUp(self):
		self.register_url = reverse('register')
		self.login_url = reverse('custom-login')
		self.user_data = {
			"email": "testuser@example.com",
			"password": "TestPassword123!",
			"first_name": "Test",
			"last_name": "User",
			"username": "testuser",
		}

	def test_user_registration(self):
		response = self.client.post(self.register_url, self.user_data, format='json')
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertIn('email', response.data)
		self.assertEqual(response.data['email'], self.user_data['email'])

	def test_user_login(self):
		# Register first
		self.client.post(self.register_url, self.user_data, format='json')
		# Activate user manually (since registration sets is_active=False)
		user = User.objects.get(email=self.user_data['email'])
		user.is_active = True
		user.save()
		# Login
		login_data = {
			"email": self.user_data["email"],
			"password": self.user_data["password"]
		}
		response = self.client.post(self.login_url, login_data, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertIn('access', response.data)
		self.assertIn('refresh', response.data)

	def test_invalid_login_credentials(self):
		# Register and activate user
		self.client.post(self.register_url, self.user_data, format='json')
		user = User.objects.get(email=self.user_data['email'])
		user.is_active = True
		user.save()
		# Wrong password
		response = self.client.post(self.login_url, {"email": self.user_data["email"], "password": "WrongPass123"}, format='json')
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
		self.assertIn('detail', response.data)

	def test_duplicate_registration(self):
		# First registration
		response1 = self.client.post(self.register_url, self.user_data, format='json')
		self.assertEqual(response1.status_code, status.HTTP_201_CREATED)
		# Duplicate registration
		response2 = self.client.post(self.register_url, self.user_data, format='json')
		self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
		self.assertIn('email', response2.data)

	def test_role_based_login(self):
		# Register and activate as patient
		self.client.post(self.register_url, self.user_data, format='json')
		user = User.objects.get(email=self.user_data['email'])
		user.is_active = True
		user.role = 'patient'
		user.save()
		# Login with correct role
		response = self.client.post(self.login_url + '?role=patient', {"email": self.user_data["email"], "password": self.user_data["password"]}, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		# Login with wrong role
		response_wrong_role = self.client.post(self.login_url + '?role=health_worker', {"email": self.user_data["email"], "password": self.user_data["password"]}, format='json')
		self.assertEqual(response_wrong_role.status_code, status.HTTP_403_FORBIDDEN)
		self.assertIn('detail', response_wrong_role.data)
