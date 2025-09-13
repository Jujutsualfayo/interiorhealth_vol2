
from django.urls import reverse
from rest_framework.test import APITestCase
from .models import MpesaPayment

class MpesaCallbackTest(APITestCase):
	def setUp(self):
		self.payment = MpesaPayment.objects.create(
			phone_number="254712345678",
			amount=100,
			checkout_request_id="ws_CO_12345",
			payment_status="pending"
		)

	def test_successful_callback_updates_payment(self):
		payload = {
			"Body": {
				"stkCallback": {
					"MerchantRequestID": "12345",
					"CheckoutRequestID": "ws_CO_12345",
					"ResultCode": 0,
					"ResultDesc": "The service request is processed successfully.",
					"CallbackMetadata": {
						"Item": [
							{"Name": "Amount", "Value": 100},
							{"Name": "MpesaReceiptNumber", "Value": "ABC123"},
							{"Name": "PhoneNumber", "Value": "254712345678"}
						]
					}
				}
			}
		}
		url = reverse("mpesa-callback")
		response = self.client.post(url, payload, format="json")
		self.payment.refresh_from_db()
		self.assertEqual(response.status_code, 200)
		self.assertEqual(self.payment.payment_status, "successful")

	def test_failed_callback_updates_payment(self):
		payload = {
			"Body": {
				"stkCallback": {
					"MerchantRequestID": "12345",
					"CheckoutRequestID": "ws_CO_12345",
					"ResultCode": 1,
					"ResultDesc": "Failed",
					"CallbackMetadata": {
						"Item": [
							{"Name": "Amount", "Value": 100},
							{"Name": "MpesaReceiptNumber", "Value": "ABC123"},
							{"Name": "PhoneNumber", "Value": "254712345678"}
						]
					}
				}
			}
		}
		url = reverse("mpesa-callback")
		response = self.client.post(url, payload, format="json")
		self.payment.refresh_from_db()
		self.assertEqual(response.status_code, 200)
		self.assertEqual(self.payment.payment_status, "failed")
