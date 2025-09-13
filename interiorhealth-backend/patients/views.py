from django.db.models import Q
from users.models import User
from rest_framework.views import APIView
from rest_framework import status

class PatientRequestHelpView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # Find an available health worker (simple round-robin or first available)
        health_worker = User.objects.filter(role="health_worker").order_by('id').first()
        if not health_worker:
            return Response({"error": "No health worker available."}, status=status.HTTP_404_NOT_FOUND)

        # Assign patient to health worker if not already assigned
        patient = request.user
        assignment, created = PatientAssignment.objects.get_or_create(patient=patient, defaults={"health_worker": health_worker})
        if not created and assignment.health_worker != health_worker:
            assignment.health_worker = health_worker
            assignment.save()

        # Return health worker info for frontend redirection
        return Response({
            "health_worker_id": health_worker.id,
            "health_worker_email": health_worker.email,
            "health_worker_name": getattr(health_worker, "full_name", "Health Worker"),
        }, status=status.HTTP_200_OK)
from rest_framework import generics, permissions
from rest_framework.views import APIView
from patients.models import PatientAssignment
from patients.models import PatientProfile, MedicalHistory, PatientInteraction
from patients.serializers import PatientAssignmentSerializer, PatientProfileSerializer, MedicalHistorySerializer, PatientInteractionSerializer
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


# Patient profile CRUD views
class PatientProfileListCreateView(generics.ListCreateAPIView):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

class PatientProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

# Medical history CRUD views
class MedicalHistoryListCreateView(generics.ListCreateAPIView):
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

class MedicalHistoryRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

# Patient interaction CRUD views
class PatientInteractionListCreateView(generics.ListCreateAPIView):
    queryset = PatientInteraction.objects.all()
    serializer_class = PatientInteractionSerializer
    permission_classes = [permissions.IsAuthenticated]

class PatientInteractionRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    queryset = PatientInteraction.objects.all()
    serializer_class = PatientInteractionSerializer
    permission_classes = [permissions.IsAuthenticated]

# Patient dashboard view (fetch profile, history, interactions for logged-in patient)
from rest_framework.response import Response
from rest_framework.views import APIView

class PatientDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = PatientProfile.objects.get(user=request.user)
        except PatientProfile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=404)
        history = MedicalHistory.objects.filter(patient=profile)
        interactions = PatientInteraction.objects.filter(patient=profile)
        return Response({
            "profile": PatientProfileSerializer(profile).data,
            "medical_history": MedicalHistorySerializer(history, many=True).data,
            "interactions": PatientInteractionSerializer(interactions, many=True).data,
        })
