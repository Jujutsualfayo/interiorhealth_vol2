from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from users.models import User
from users.serializers import UserProfileSerializer

class DoctorSearchView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        query = request.GET.get('q', '')
        category = request.GET.get('category', None)
        # Filter health workers
        doctors = User.objects.filter(role='health_worker')
        if query:
            doctors = doctors.filter(
                models.Q(first_name__icontains=query) |
                models.Q(last_name__icontains=query) |
                models.Q(username__icontains=query)
            )
        if category and category != 'All':
            # Assuming health_worker has a 'specialty' or 'illness_categories' field
            doctors = doctors.filter(
                models.Q(specialty__icontains=category) |
                models.Q(illness_categories__icontains=category)
            )
        results = UserProfileSerializer(doctors, many=True).data
        return Response({'results': results}, status=status.HTTP_200_OK)
