from rest_framework import generics, permissions
from drugs.models import InventoryItem
from drugs.serializers import DrugSerializer
from users.permissions import IsAdminUser  

class DrugCreateView(generics.CreateAPIView):
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]

class DrugUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]
    lookup_field = 'id'
