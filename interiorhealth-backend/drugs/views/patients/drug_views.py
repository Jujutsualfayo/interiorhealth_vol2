from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from drugs.models import Drug
from drugs.serializers import DrugSerializer

class PatientDrugListView(generics.ListAPIView):
    queryset = Drug.objects.all()
    serializer_class = DrugSerializer
    permission_classes = [IsAuthenticated]
