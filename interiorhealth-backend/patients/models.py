from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class PatientAssignment(models.Model):
    patient = models.OneToOneField(User, on_delete=models.CASCADE, related_name='assignment')
    health_worker = models.ForeignKey(User, on_delete=models.CASCADE, related_name='patients_assigned')
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('patient', 'health_worker')

    def __str__(self):
        return f"{self.patient.email} → {self.health_worker.email}"


# Patient profile model
class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    contact_number = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    emergency_contact = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name

# Medical history model
class MedicalHistory(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='medical_history')
    description = models.TextField()
    date_recorded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"History for {self.patient.full_name} on {self.date_recorded.date()}"

# Patient interaction/notes model
class PatientInteraction(models.Model):
    patient = models.ForeignKey(PatientProfile, on_delete=models.CASCADE, related_name='interactions')
    health_worker = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    note = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Interaction for {self.patient.full_name} on {self.date.date()}"

