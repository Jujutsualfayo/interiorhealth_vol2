from django.db import models
from users.models import CustomUser  
import uuid


class Payment(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('successful', 'Successful'),
        ('failed', 'Failed'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='KES')
    transaction_id = models.CharField(max_length=100, unique=True)  # Flutterwave tx_ref
    flutterwave_tx_id = models.CharField(max_length=100, blank=True, null=True)  # tx_id returned from Flutterwave
    status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.email} - {self.transaction_id} - {self.status}"

