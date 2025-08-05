# orders/views/patient/order_views.py
import requests
from rest_framework import generics, permissions
from orders.serializers import OrderSerializer
from orders.models import Order
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings

@api_view(['POST'])
def initiate_payment(request):
    data = request.data

    headers = {
        "Authorization": f"Bearer {settings.FLW_SECRET_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "tx_ref": data.get("tx_ref"),
        "amount": data.get("amount"),
        "currency": "KES",
        "redirect_url": "http://localhost:3000/payment-success",  # adjust to your React frontend
        "payment_options": "card,mpesa",
        "customer": {
            "email": data.get("email"),
            "phonenumber": data.get("phonenumber"),
            "name": data.get("name")
        },
        "customizations": {
            "title": "Interior Health Payment",
            "description": "Purchase of health product",
            "logo": "https://your-logo-url.com/logo.png"
        }
    }

    res = requests.post("https://api.flutterwave.com/v3/payments", headers=headers, json=payload)
    return Response(res.json())


class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer  # ✅ Make sure this is here
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(patient=self.request.user).order_by('-created_at')



