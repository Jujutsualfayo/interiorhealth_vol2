from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views.register import RegisterUserView, RegisterHealthWorkerView
from users.views.token import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenBlacklistView
from users.views.verify_email import VerifyEmailView
from users.views.profile_view import UserProfileView 
from users.views.change_password import ChangePasswordView
from users.views.password_reset_request import PasswordResetRequestView
from users.views.password_reset_confirm import PasswordResetConfirmView

urlpatterns = [
    # Registration
    path('register/', RegisterUserView.as_view(), name='register'),
    path('register/healthworker/', RegisterHealthWorkerView.as_view(), name='register_health_worker'),

    # JWT Authentication
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    # Email Verification
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),

    # ✅ Profile Management
    path('me/', UserProfileView.as_view(), name='user-profile'),

    #Change password 
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),

    #reset password
    path('forgot-password/', PasswordResetRequestView.as_view(), name='forgot-password'),

    #confirm reset passwd
    path('reset-password/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
]
