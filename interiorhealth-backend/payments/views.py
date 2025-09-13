from rest_framework.decorators import api_view
from rest_framework.response import Response
from .mpesa import lipa_na_mpesa

@api_view(["POST"])
def initiate_payment(request):
    phone = request.data.get("phone")
    amount = request.data.get("amount")

    if not phone or not amount:
        return Response({"error": "Phone and amount are required"}, status=400)

    result = lipa_na_mpesa(phone, int(amount))
    return Response(result)

@api_view(["POST"])
def mpesa_callback(request):
    # Safaricom will send transaction results here
    data = request.data
    # TODO: Save payment status to DB
    return Response({"ResultCode": 0, "ResultDesc": "Accepted"})
