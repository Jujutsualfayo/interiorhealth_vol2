import uuid
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

@csrf_exempt
def initiate_mpesa_payment(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST method allowed"}, status=405)

    try:
        data = json.loads(request.body)
        phone = data.get("phone_number")
        amount = data.get("amount")
        email = data.get("email", "test@example.com")
        name = data.get("name", "Interior Health User")

        tx_ref = f"INT-HEALTH-{uuid.uuid4()}"

        headers = {
            "Authorization": f"Bearer {settings.FLW_CLIENT_SECRET}",
            "Content-Type": "application/json"
        }

        payload = {
            "tx_ref": tx_ref,
            "amount": amount,
            "currency": "KES",
            "redirect_url": "https://yourdomain.com/payment-success",
            "payment_options": "mpesa",
            "customer": {
                "email": email,
                "phonenumber": phone,
                "name": name
            },
            "customizations": {
                "title": "Interior Health",
                "description": "Drug order payment"
            }
        }

        url = f"{settings.FLW_BASE_URL}/payments"
        response = requests.post(url, headers=headers, json=payload)
        return JsonResponse(response.json(), status=response.status_code)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
