
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from drugs.models import InventoryItem
from drugs.serializers import InventoryItemSerializer

class PatientInventoryListView(generics.ListAPIView):
    queryset = InventoryItem.objects.all()
    serializer_class = InventoryItemSerializer
    from users.permissions import IsPatient
    permission_classes = [IsAuthenticated, IsPatient]
