from django.db import models

class InventoryItem(models.Model):
    CATEGORY_CHOICES = [
        ("drug", "Medical Drug"),
        ("supply", "Health Supply"),
        ("device", "Medical Device"),
        ("other", "Other"),
    ]
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="drug")
    dosage_form = models.CharField(max_length=100, blank=True, null=True)  # Only for drugs
    strength = models.CharField(max_length=100, blank=True, null=True)     # Only for drugs
    quantity_available = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.category})"
