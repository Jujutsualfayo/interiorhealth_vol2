from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from users.serializers import RegisterSerializer
from users.models import User


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_healthworker(request):
    data = request.data.copy()
    data['role'] = 'health_worker'

    serializer = RegisterSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
