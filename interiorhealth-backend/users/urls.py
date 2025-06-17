from django.urls import path
from users.views.register import RegisterUserView, RegisterHealthWorkerView
from users.views.token import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),  # FIXED
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("register/healthworker/", RegisterHealthWorkerView.as_view(), name="register_health_worker"),
]
