from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.models import User

class RegisterPatientByHealthworkerView(APIView):
    def post(self, request):
        data = request.data.copy()
        # Only allow healthworkers to use this endpoint
        if not request.user.is_authenticated or request.user.role != "healthworker":
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        # Required fields: first_name, last_name, email (contact)
        first_name = data.get("first_name", "")
        last_name = data.get("last_name", "")
        email = data.get("email", "")
        if not first_name or not email:
            return Response({"detail": "First name and contact (email) are required."}, status=status.HTTP_400_BAD_REQUEST)
        # Create patient with random password, active and verified
        patient = User.objects.create_user(
            email=email,
            password=User.objects.make_random_password(),
            first_name=first_name,
            last_name=last_name,
            role="patient",
            is_active=True,
            is_verified=True
        )
        return Response({
            "id": patient.id,
            "email": patient.email,
            "first_name": patient.first_name,
            "last_name": patient.last_name,
            "role": patient.role
        }, status=status.HTTP_201_CREATED)
