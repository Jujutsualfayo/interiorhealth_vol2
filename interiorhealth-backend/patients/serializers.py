from rest_framework import serializers
from users.models import User
from patients.models import PatientAssignment
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

        if health_worker.role != "health_worker":
            raise serializers.ValidationError(f"User '{health_worker.email}' is not a valid health worker.")

        if PatientAssignment.objects.filter(patient=patient).exists():
            raise serializers.ValidationError(f"Patient '{patient.email}' is already assigned to a health worker.")

        return data

    def create(self, validated_data):
        patient_id = validated_data.pop('patient_id')
        health_worker_id = validated_data.pop('health_worker_id')
        patient = User.objects.get(id=patient_id)
        health_worker = User.objects.get(id=health_worker_id)
        return PatientAssignment.objects.create(patient=patient, health_worker=health_worker)
