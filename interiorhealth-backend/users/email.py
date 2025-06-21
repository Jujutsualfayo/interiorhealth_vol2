from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse

from users.utils import generate_email_verification_token

def send_verification_email(user, request):
    token = generate_email_verification_token(user)
    frontend_url = request.build_absolute_uri(
        reverse('verify-email') + f'?token={token}'
    )

    subject = 'Verify your InteriorHealth account'
    message = f"""
    Hi {user.first_name or user.username},

    Thank you for registering at InteriorHealth.

    Please verify your email by clicking the link below:
    {frontend_url}

    If you didn’t sign up, please ignore this email.

    Regards,
    InteriorHealth Team
    """

    send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
        fail_silently=False,
    )

def send_password_reset_email(user, uid, token, request):
    reset_link = f"{settings.FRONTEND_BASE_URL}/reset-password?uid={uid}&token={token}"
    subject = "Reset Your Password"
    message = f"Hi {user.username},\n\nUse the link below to reset your password:\n{reset_link}\n\nIf you didn't request this, ignore the email."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)