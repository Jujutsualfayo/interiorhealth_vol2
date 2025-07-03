from rest_framework import generics, permissions
from patients.models import PatientAssignment
from patients.serializers import PatientAssignmentSerializer
from users.permissions import IsAdminUser, IsHealthWorker


# Admin-only view to assign patients to a health worker
class AssignPatientView(generics.CreateAPIView):
    queryset = PatientAssignment.objects.all()
    serializer_class = PatientAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]


# Health worker-only view to list their assigned patients
class AssignedPatientsListView(generics.ListAPIView):
    serializer_class = PatientAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsHealthWorker]

    def get_queryset(self):
        return PatientAssignment.objects.filter(health_worker=self.request.user)
