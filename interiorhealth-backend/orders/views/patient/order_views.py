# orders/views/patient/order_views.py

from rest_framework import generics, permissions
from orders.serializers import OrderSerializer
from orders.models import Order

class OrderCreateView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    # The serializer's create method now handles patient and address

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(patient=self.request.user).order_by('-created_at')
