from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import requests
import json
from .models import MpesaPayment
from django.conf import settings
import base64
from datetime import datetime


def get_access_token():
    consumer_key = settings.MPESA_CONSUMER_KEY
    consumer_secret = settings.MPESA_CONSUMER_SECRET
    api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    r = requests.get(api_URL, auth=(consumer_key, consumer_secret))
    mpesa_access_token = json.loads(r.text)
    return mpesa_access_token['access_token']


@csrf_exempt
def initiate_mpesa_payment(request):
    if request.method == 'POST':
        phone_number = request.POST.get('phone')
        amount = request.POST.get('amount')

        if not phone_number or not amount:
            return JsonResponse({"error": "Phone number and amount are required."}, status=400)

        access_token = get_access_token()

        # Lipa na Mpesa credentials
        business_shortCode = settings.MPESA_BUSINESS_SHORTCODE
        lipa_na_mpesa_passkey = settings.MPESA_PASSKEY
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        data_to_encode = business_shortCode + lipa_na_mpesa_passkey + timestamp
        online_password = base64.b64encode(data_to_encode.encode()).decode('utf-8')

        api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        payload = {
            "BusinessShortCode": business_shortCode,
            "Password": online_password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": phone_number,
            "PartyB": business_shortCode,
            "PhoneNumber": phone_number,
            "CallBackURL": settings.MPESA_CALLBACK_URL,
            "AccountReference": "InteriorHealth",
            "TransactionDesc": "Payment for Drugs"
        }

        response = requests.post(api_url, json=payload, headers=headers)
        res_data = response.json()

        # Save initial transaction details
        MpesaPayment.objects.create(
            phone_number=phone_number,
            amount=amount,
            checkout_request_id=res_data.get("CheckoutRequestID", "")
        )

        return JsonResponse({
            "message": "STK push initiated",
            "checkoutRequestID": res_data.get("CheckoutRequestID", ""),
            "response": res_data
        })

    return JsonResponse({"error": "Invalid request method."}, status=405)



# Robust Mpesa callback handler
@csrf_exempt
def mpesa_callback(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            # Safaricom sends callback data in 'Body' > 'stkCallback'
            callback = data.get("Body", {}).get("stkCallback", {})
            checkout_request_id = callback.get("CheckoutRequestID")
            result_code = callback.get("ResultCode")
            result_desc = callback.get("ResultDesc")

            # Find payment record
            payment = MpesaPayment.objects.filter(checkout_request_id=checkout_request_id).first()
            if not payment:
                return JsonResponse({"error": "Payment not found."}, status=404)

            # Update payment status
            if result_code == 0:
                payment.payment_status = "successful"
            else:
                payment.payment_status = "failed"
            payment.save()

            # Optionally, save more details (amount, phone, etc.) from callback
            # You can parse 'CallbackMetadata' for more info

            return JsonResponse({"message": "Callback processed.", "status": payment.payment_status, "desc": result_desc})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    return JsonResponse({"error": "Invalid request method."}, status=405)
