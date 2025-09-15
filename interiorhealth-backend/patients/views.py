from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers import UserSerializer
from users.permissions import IsAdminUser, IsHealthWorker

from patients.models import (
    PatientAssignment,
    PatientProfile,
    MedicalHistory,
    PatientInteraction,
)
from patients.serializers import (
    PatientAssignmentSerializer,
    PatientProfileSerializer,
    MedicalHistorySerializer,
    PatientInteractionSerializer,
)


class PatientRequestHelpView(APIView):
    """Endpoint for a patient to request help (implementation placeholder)."""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        # TODO: Add actual help-request logic
        pass


class PatientRegisterView(APIView):
    """Registers a new patient user."""
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save(role="patient")
            return Response(
                {
                    "message": (
                        "Patient registered successfully. "
                        "Please verify your email."
                    ),
                    "user_id": user.id,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AssignPatientView(generics.CreateAPIView):
    """Admin-only view to assign patients to a health worker."""
    queryset = PatientAssignment.objects.all()
    serializer_class = PatientAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminUser]


class AssignedPatientsListView(generics.ListAPIView):
    """Health worker-only view to list their assigned patients."""
    serializer_class = PatientAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated, IsHealthWorker]

    def get_queryset(self):
        return PatientAssignment.objects.filter(health_worker=self.request.user)


class PatientProfileListCreateView(generics.ListCreateAPIView):
    """List or create patient profiles."""
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class PatientProfileRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """Retrieve or update a specific patient profile."""
    queryset = PatientProfile.objects.all()
    serializer_class = PatientProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class MedicalHistoryListCreateView(generics.ListCreateAPIView):
    """List or create medical histories."""
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    permission_classes = [permissions.IsAuthenticated]


class MedicalHistoryRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """Retrieve or update a medical history record."""
    queryset = MedicalHistory.objects.all()
    serializer_class = MedicalHistorySerializer
    permission_classes = [permissions.IsAuthenticated]


class PatientInteractionListCreateView(generics.ListCreateAPIView):
    """List or create patient interactions."""
    queryset = PatientInteraction.objects.all()
    serializer_class = PatientInteractionSerializer
    permission_classes = [permissions.IsAuthenticated]


class PatientInteractionRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """Retrieve or update a patient interaction."""
    queryset = PatientInteraction.objects.all()
    serializer_class = PatientInteractionSerializer
    permission_classes = [permissions.IsAuthenticated]


class PatientDashboardView(APIView):
    """Fetch the logged-in patient’s profile, history, and interactions."""
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
