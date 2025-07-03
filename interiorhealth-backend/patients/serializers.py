from rest_framework import serializers
from users.models import User
from patients.models import PatientAssignment

class PatientAssignmentSerializer(serializers.ModelSerializer):
    patient_email = serializers.EmailField(source='patient.email', read_only=True)
    health_worker_email = serializers.EmailField(source='health_worker.email', read_only=True)

    class Meta:
        model = PatientAssignment
        fields = ['id', 'patient', 'patient_email', 'health_worker', 'health_worker_email', 'assigned_at']
        read_only_fields = ['assigned_at']
