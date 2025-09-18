from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drugs.models import DrugRequest
from users.models import User

class RequestDrugView(APIView):
    def post(self, request):
        if not request.user.is_authenticated or request.user.role != "healthworker":
            return Response({"detail": "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
        data = request.data
        drug_name = data.get("drug_name")
        quantity = data.get("quantity")
        notes = data.get("notes", "")
        if not drug_name or not quantity:
            return Response({"detail": "Drug name and quantity are required."}, status=status.HTTP_400_BAD_REQUEST)
        # Save request
        drug_request = DrugRequest.objects.create(
            healthworker=request.user,
            drug_name=drug_name,
            quantity=quantity,
            notes=notes
        )
        return Response({"id": drug_request.id, "detail": "Drug request submitted."}, status=status.HTTP_201_CREATED)
