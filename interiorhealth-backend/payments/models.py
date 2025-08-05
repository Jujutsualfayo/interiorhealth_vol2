from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("successful", "Successful"),
        ("failed", "Failed"),
    ]

    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    transaction_id = models.CharField(max_length=100, unique=True)
    reference = models.CharField(max_length=100, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="KES")
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default="pending")
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.username} - {self.transaction_id} - {self.payment_status}"
