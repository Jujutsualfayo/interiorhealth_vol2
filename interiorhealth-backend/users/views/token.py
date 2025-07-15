from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny  # ✅ ADD THIS
from users.serializers import CustomTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]  # ✅ ADD THIS
