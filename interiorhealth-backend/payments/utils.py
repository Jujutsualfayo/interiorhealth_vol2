import requests
from django.conf import settings
from requests.auth import HTTPBasicAuth

def get_mpesa_access_token():
    if settings.MPESA_ENV == "sandbox":
        url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    else:
        url = "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    response = requests.get(
        url,
        auth=HTTPBasicAuth(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET)
    )
    response.raise_for_status()
    return response.json().get("access_token")
