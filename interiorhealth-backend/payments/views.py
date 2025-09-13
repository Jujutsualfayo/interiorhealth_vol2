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
    # Example Safaricom callback structure:
    # {
    #   "Body": {
    #     "stkCallback": {
    #       "MerchantRequestID": "...",
    #       "CheckoutRequestID": "...",
    #       "ResultCode": 0,
    #       "ResultDesc": "The service request is processed successfully.",
    #       "CallbackMetadata": {
    #         "Item": [
    #           {"Name": "Amount", "Value": 100},
    #           {"Name": "MpesaReceiptNumber", "Value": "ABC123"},
    #           {"Name": "PhoneNumber", "Value": "2547..."}
    #         ]
    #       }
    #     }
    #   }
    # }

    try:
        callback = data.get("Body", {}).get("stkCallback", {})
        result_code = callback.get("ResultCode")
        result_desc = callback.get("ResultDesc")
        checkout_request_id = callback.get("CheckoutRequestID")
        metadata = callback.get("CallbackMetadata", {}).get("Item", [])

        # Extract metadata
        amount = None
        phone_number = None
        receipt_number = None
        for item in metadata:
            if item["Name"] == "Amount":
                amount = item["Value"]
            elif item["Name"] == "MpesaReceiptNumber":
                receipt_number = item["Value"]
            elif item["Name"] == "PhoneNumber":
                phone_number = str(item["Value"])

        # Find the payment record
        from .models import MpesaPayment
        payment = MpesaPayment.objects.filter(checkout_request_id=checkout_request_id).first()
        if not payment:
            # Optionally, try to match by phone and amount if checkout_request_id missing
            payment = MpesaPayment.objects.filter(phone_number=phone_number, amount=amount, payment_status="pending").order_by("-timestamp").first()

        if payment:
            if result_code == 0:
                payment.payment_status = "successful"
            else:
                payment.payment_status = "failed"
            payment.checkout_request_id = checkout_request_id or payment.checkout_request_id
            payment.save()
        else:
            # Log or handle missing payment record
            pass

        return Response({"ResultCode": 0, "ResultDesc": "Accepted"})
    except Exception as e:
        # Log error, return error response
        return Response({"ResultCode": 1, "ResultDesc": f"Error: {str(e)}"}, status=500)
