from rest_framework import serializers
from users.models import User
from patients.models import PatientAssignment
from patients.models import PatientProfile, MedicalHistory, PatientInteraction
from users.serializers import UserProfileSerializer

class PatientAssignmentSerializer(serializers.ModelSerializer):
    patient = UserProfileSerializer(read_only=True)
    patient_id = serializers.IntegerField(write_only=True)
    health_worker_email = serializers.EmailField(source='health_worker.email', read_only=True)
    health_worker_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = PatientAssignment
        fields = [
            'id',
            'patient',
            'patient_id',
            'health_worker_id',
            'health_worker_email',
            'assigned_at',
        ]
        read_only_fields = ['assigned_at']

    def validate(self, data):
        patient_id = data.get("patient_id")
        health_worker_id = data.get("health_worker_id")

        try:
            patient = User.objects.get(id=patient_id)
        except User.DoesNotExist:
            raise serializers.ValidationError(f"Patient with ID {patient_id} does not exist.")

        try:
            health_worker = User.objects.get(id=health_worker_id)
        except User.DoesNotExist:
            raise serializers.ValidationError(f"Health worker with ID {health_worker_id} does not exist.")

        if patient.role != "patient":
            raise serializers.ValidationError(f"User '{patient.email}' is not a valid patient.")


# Serializer for PatientProfile
class PatientProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = PatientProfile
        fields = [
            'id',
            'user',
            'user_email',
            'full_name',
            'date_of_birth',
            'contact_number',
            'address',
            'emergency_contact',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at', 'user_email']

# Serializer for MedicalHistory
class MedicalHistorySerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)

    class Meta:
        model = MedicalHistory
        fields = [
            'id',
            'patient',
            'patient_name',
            'description',
            'date_recorded',
        ]
        read_only_fields = ['date_recorded', 'patient_name']

# Serializer for PatientInteraction
class PatientInteractionSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source='patient.full_name', read_only=True)
    health_worker_email = serializers.EmailField(source='health_worker.email', read_only=True)

    class Meta:
        model = PatientInteraction
        fields = [
            'id',
            'patient',
            'patient_name',
            'health_worker',
            'health_worker_email',
            'note',
            'date',
        ]
        read_only_fields = ['date', 'patient_name', 'health_worker_email']

