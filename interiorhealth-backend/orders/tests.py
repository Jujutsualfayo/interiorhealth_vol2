from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from drugs.models import InventoryItem
from orders.models import Order, OrderItem

User = get_user_model()

class OrderInventoryTestCase(TestCase):
	def setUp(self):
		self.client = APIClient()
		self.patient = User.objects.create_user(email='testpatient@example.com', password='testpass', role='patient')
		self.other_user = User.objects.create_user(email='other@example.com', password='otherpass', role='patient')
		self.item1 = InventoryItem.objects.create(
			name='Paracetamol',
			description='Pain relief tablet',
			category='drug',
			dosage_form='Tablet',
			strength='500mg',
			quantity_available=100,
			price=50.00,
			is_active=True
		)
		self.item2 = InventoryItem.objects.create(
			name='Amoxicillin',
			description='Antibiotic',
			category='drug',
			dosage_form='Capsule',
			strength='250mg',
			quantity_available=80,
			price=120.00,
			is_active=True
		)

	def test_inventory_access_authenticated(self):
		self.client.force_authenticate(user=self.patient)
		response = self.client.get('/api/drugs/patients/inventory/')
		self.assertEqual(response.status_code, 200)
		self.assertTrue(any(item['name'] == 'Paracetamol' for item in response.data))

	def test_inventory_access_unauthenticated(self):
		self.client.force_authenticate(user=None)
		response = self.client.get('/api/drugs/patients/inventory/')
		self.assertEqual(response.status_code, 401)

	def test_order_creation_success(self):
		self.client.force_authenticate(user=self.patient)
		payload = {
			"items": [
				{"item": self.item1.id, "quantity": 2},
				{"item": self.item2.id, "quantity": 1}
			],
			"total_amount": 220,
			"address": "123 Main St"
		}
		response = self.client.post('/api/orders/patient/create/', payload, format='json')
		self.assertEqual(response.status_code, 201)
		self.assertIn('id', response.data)
		order_id = response.data['id']
		order = Order.objects.get(id=order_id)
		self.assertEqual(order.patient, self.patient)
		self.assertEqual(order.items.count(), 2)

	def test_order_creation_missing_items(self):
		self.client.force_authenticate(user=self.patient)
		payload = {"total_amount": 100, "address": "123 Main St"}
		response = self.client.post('/api/orders/patient/create/', payload, format='json')
		self.assertEqual(response.status_code, 400)
		self.assertIn('items', response.data)

	def test_order_creation_unauthenticated(self):
		self.client.force_authenticate(user=None)
		payload = {
			"items": [{"item": self.item1.id, "quantity": 2}],
			"total_amount": 100,
			"address": "123 Main St"
		}
		response = self.client.post('/api/orders/patient/create/', payload, format='json')
		self.assertEqual(response.status_code, 401)
from django.test import TestCase

# Create your tests here.
