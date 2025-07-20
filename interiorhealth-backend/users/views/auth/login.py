# views.py
import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

logger = logging.getLogger('login')

class CustomLoginView(APIView):
    def post(self, request):
        logger.debug("Login POST request received")

        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            logger.warning("Missing email or password")
            return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)  # Only works if email is used as username

        if user is None:
            logger.warning(f"Failed login attempt for email: {email}")
            return Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)

        expected_role = request.query_params.get("role")
        if expected_role and user.role != expected_role:
            logger.warning(f"Role mismatch: expected {expected_role}, got {user.role}")
            return Response({"detail": f"User is not a {expected_role}."}, status=status.HTTP_403_FORBIDDEN)

        refresh = RefreshToken.for_user(user)
        logger.info(f"User {email} logged in successfully")
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user": {
                "id": user.id,
                "email": user.email,
                "role": user.role,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        }, status=status.HTTP_200_OK)
