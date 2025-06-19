from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from users.views.register import RegisterUserView, RegisterHealthWorkerView
from users.views.token import CustomTokenObtainPairView
from users.views.verify_email import VerifyEmailView

urlpatterns = [
    # Registration
    path('register/', RegisterUserView.as_view(), name='register'),
    path('register/healthworker/', RegisterHealthWorkerView.as_view(), name='register_health_worker'),

    # JWT Authentication
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Email Verification
    path('verify-email/', VerifyEmailView.as_view(), name='verify-email'),
]
