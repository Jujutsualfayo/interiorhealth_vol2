from django.core.mail import send_mail
from django.conf import settings
from django.urls import reverse

from users.utils import generate_email_verification_token

def send_verification_email(user, request):
    from django.template.loader import render_to_string
    from django.core.mail import EmailMultiAlternatives
    from datetime import datetime

    token = generate_email_verification_token(user)
    verification_url = request.build_absolute_uri(
        reverse('verify-email') + f'?token={token}'
    )

    subject = 'Verify your InteriorHealth account'
    year = datetime.now().year
    context = {
        'user': user,
        'verification_url': verification_url,
        'year': year,
    }
    html_message = render_to_string('emails/verification_email.html', context)
    text_message = f"Hi {user.first_name or user.username},\n\nThank you for registering at InteriorHealth.\n\nPlease verify your email by clicking the link below:\n{verification_url}\n\nIf you didn’t sign up, please ignore this email.\n\nRegards,\nInteriorHealth Team"

    email = EmailMultiAlternatives(
        subject,
        text_message,
        settings.DEFAULT_FROM_EMAIL,
        [user.email],
    )
    email.attach_alternative(html_message, "text/html")
    email.send(fail_silently=False)

def send_password_reset_email(user, uid, token, request):
    reset_link = f"{settings.FRONTEND_BASE_URL}/reset-password?uid={uid}&token={token}"
    subject = "Reset Your Password"
    message = f"Hi {user.username},\n\nUse the link below to reset your password:\n{reset_link}\n\nIf you didn't request this, ignore the email."
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    send_mail(subject, message, from_email, recipient_list)