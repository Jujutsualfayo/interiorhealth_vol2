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

