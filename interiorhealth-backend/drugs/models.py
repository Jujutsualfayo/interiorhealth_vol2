from django.db import models

class Drug(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    dosage_form = models.CharField(max_length=100)  
    strength = models.CharField(max_length=100)     
    quantity_available = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.strength})"
