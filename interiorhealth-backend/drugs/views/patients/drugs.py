from rest_framework import generics, permissions, filters
from drugs.models import Drug
from drugs.serializers import DrugSerializer
from users.permissions import IsPatient

class DrugListView(generics.ListAPIView):
    """
    Allow patients to view and search available drugs.
    """
    queryset = Drug.objects.all().order_by('-created_at')
    serializer_class = DrugSerializer
    permission_classes = [permissions.IsAuthenticated, IsPatient]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']
