from django.urls import path
from users.views.healthworker.register_healthworker import register_healthworker
from users.views.healthworker.profile import HealthWorkerProfileView
from users.views.patient.register_user import RegisterUserView
from users.views.auth.login import CustomLoginView  # ✅ new login
from rest_framework_simplejwt.views import TokenRefreshView, TokenBlacklistView
from users.views.verify_email import VerifyEmailView
from users.views.patient.profile import PatientProfileView
from users.views.change_password import ChangePasswordView
from users.views.password_reset_request import PasswordResetRequestView
from users.views.password_reset_confirm import PasswordResetConfirmView

urlpatterns = [
    # Doctor Search
    path('doctors/search/',
         __import__('users.views.healthworker.search_doctors').views.healthworker.search_doctors.DoctorSearchView.as_view(),
         name='doctor-search'),
    # Registration
    path('register/', RegisterUserView.as_view(), name='register'),
    path('register/healthworker/', register_healthworker, name='register_health_worker'),

    # ✅ Replaced login
    path('login/', CustomLoginView.as_view(), name='custom-login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),   # optional
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),       # optional

    # Email Verification
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),

    # Profile Management
    path('me/', PatientProfileView.as_view(), name='user-profile'),
    path('healthworker/me/', HealthWorkerProfileView.as_view(), name='healthworker-profile'),

    # Password Management
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('forgot-password/', PasswordResetRequestView.as_view(), name='forgot-password'),
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]
