from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class MpesaPayment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ("pending", "Pending"),
        ("successful", "Successful"),
        ("failed", "Failed"),
    ]

    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mpesa_payments', null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    checkout_request_id = models.CharField(max_length=255, blank=True, null=True)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default="pending")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.phone_number} - {self.amount} - {self.payment_status}"
