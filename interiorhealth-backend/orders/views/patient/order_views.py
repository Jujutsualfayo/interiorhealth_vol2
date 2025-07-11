# orders/views/patient/order_views.py
from rest_framework import generics, permissions
from orders.serializers import OrderSerializer
from orders.models import Order

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



