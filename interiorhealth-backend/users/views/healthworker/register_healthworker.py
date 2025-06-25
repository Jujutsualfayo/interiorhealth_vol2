from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.authentication import JWTAuthentication
from users.permissions import IsAdminUser
from users.serializers import UserSerializer  # You named it RegisterSerializer in the view

@api_view(['POST'])
@authentication_classes([JWTAuthentication])  # ✅ explicitly set JWT
@permission_classes([IsAuthenticated, IsAdminUser])  # ✅ restrict to admin
def register_healthworker(request):
    data = request.data.copy()
    data['role'] = 'health_worker'

    serializer = UserSerializer(data=data, context={"request": request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
