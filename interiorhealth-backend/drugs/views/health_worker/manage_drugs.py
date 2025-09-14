
from rest_framework import generics, permissions
from drugs.models import InventoryItem
from drugs.serializers import InventoryItemSerializer
from users.permissions import IsAdminUser

class InventoryItemCreateView(generics.CreateAPIView):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

class InventoryItemUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    lookup_field = 'id'
