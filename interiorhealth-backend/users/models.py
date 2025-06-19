from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('patient', 'Patient'),
        ('health_worker', 'Health Worker'),
        ('admin', 'Admin'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')

    # ✅ Email as unique identifier
    email = models.EmailField(unique=True)

    # ✅ Email verification status
    is_verified = models.BooleanField(default=False)

    # Remove username uniqueness constraint if not used for login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Django requires this to create superusers

    def __str__(self):
        return f"{self.email} ({self.role})"

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'





