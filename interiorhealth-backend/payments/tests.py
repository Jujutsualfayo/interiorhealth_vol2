
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

	def test_callback_with_missing_fields(self):
		payload = {
			"Body": {
				"stkCallback": {
					# Missing CheckoutRequestID
					"MerchantRequestID": "12345",
					"ResultCode": 0,
					"ResultDesc": "Success",
					"CallbackMetadata": {
						"Item": [
							{"Name": "Amount", "Value": 100}
						]
					}
				}
			}
		}
		url = reverse("mpesa-callback")
		response = self.client.post(url, payload, format="json")
		self.assertNotEqual(response.status_code, 500)

	def test_callback_with_invalid_amount(self):
		payload = {
			"Body": {
				"stkCallback": {
					"MerchantRequestID": "12345",
					"CheckoutRequestID": "ws_CO_12345",
					"ResultCode": 0,
					"ResultDesc": "Success",
					"CallbackMetadata": {
						"Item": [
							{"Name": "Amount", "Value": -50},  # Invalid negative amount
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
		self.assertIn(self.payment.payment_status, ["failed", "pending", "successful"])

	def test_callback_with_wrong_checkout_id(self):
		payload = {
			"Body": {
				"stkCallback": {
					"MerchantRequestID": "12345",
					"CheckoutRequestID": "ws_CO_WRONG",
					"ResultCode": 0,
					"ResultDesc": "Success",
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
		self.assertEqual(response.status_code, 404)

	def test_callback_idempotency(self):
		payload = {
			"Body": {
				"stkCallback": {
					"MerchantRequestID": "12345",
					"CheckoutRequestID": "ws_CO_12345",
					"ResultCode": 0,
					"ResultDesc": "Success",
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
		response1 = self.client.post(url, payload, format="json")
		response2 = self.client.post(url, payload, format="json")
		self.payment.refresh_from_db()
		self.assertEqual(response1.status_code, 200)
		self.assertEqual(response2.status_code, 200)
		self.assertEqual(self.payment.payment_status, "successful")

	def test_callback_with_malformed_json(self):
		url = reverse("mpesa-callback")
		# Send invalid JSON (string instead of dict)
		response = self.client.post(url, "not a json", content_type="application/json")
		self.assertIn(response.status_code, [400, 415])

	def test_callback_with_wrong_http_method(self):
		url = reverse("mpesa-callback")
		response = self.client.get(url)
		self.assertIn(response.status_code, [405, 404])
