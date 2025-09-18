from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from users.serializers import UserSerializer

class RegisterUserView(APIView):
    def post(self, request):
        data = request.data.copy()
        # Respect submitted role if valid, else default to 'patient'
        submitted_role = data.get('role', 'patient')
        if submitted_role not in ['patient', 'health_worker']:
            submitted_role = 'patient'
        data['role'] = submitted_role
        serializer = UserSerializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
