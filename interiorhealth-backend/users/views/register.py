from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from users.models import User
from users.serializers import UserSerializer
from users.permissions import IsAdminUser
from users.serializers import UserSerializer as RegisterSerializer


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        return {'request': self.request}  # ✅ Needed for building absolute verification link


class RegisterHealthWorkerView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get_serializer_context(self):
        return {'request': self.request}  # ✅ Also needed here if email is sent

    def perform_create(self, serializer):
        serializer.save(role='health_worker')
