from rest_framework.decorators import api_view
from rest_framework.response import Response
from .mpesa import lipa_na_mpesa
import logging
from django.conf import settings

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

    logger = logging.getLogger(__name__)
    # Security: Optionally check request.META['REMOTE_ADDR'] or a shared secret header
    # allowed_ips = getattr(settings, 'MPESA_ALLOWED_IPS', None)
    # if allowed_ips and request.META.get('REMOTE_ADDR') not in allowed_ips:
    #     logger.warning(f"Unauthorized callback from {request.META.get('REMOTE_ADDR')}")
    #     return Response({"ResultCode": 1, "ResultDesc": "Unauthorized"}, status=403)

    try:
        logger.info(f"Mpesa callback received: {data}")
        callback = data.get("Body", {}).get("stkCallback", {})
        result_code = callback.get("ResultCode")
        result_desc = callback.get("ResultDesc")
        checkout_request_id = callback.get("CheckoutRequestID")
        metadata = callback.get("CallbackMetadata", {}).get("Item", [])

        # Validate required fields
        if result_code is None or checkout_request_id is None:
            logger.error("Missing required callback fields")
            return Response({"ResultCode": 1, "ResultDesc": "Missing required fields"}, status=400)

        # Extract metadata safely
        amount = None
        phone_number = None
        receipt_number = None
        for item in metadata:
            if item.get("Name") == "Amount":
                amount = item.get("Value")
            elif item.get("Name") == "MpesaReceiptNumber":
                receipt_number = item.get("Value")
            elif item.get("Name") == "PhoneNumber":
                phone_number = str(item.get("Value"))

        # Find the payment record
        from .models import MpesaPayment
        payment = MpesaPayment.objects.filter(checkout_request_id=checkout_request_id).first()
        if not payment:
            # Optionally, try to match by phone and amount if checkout_request_id missing
            payment = MpesaPayment.objects.filter(phone_number=phone_number, amount=amount, payment_status="pending").order_by("-timestamp").first()

        if payment:
            # Idempotency: Only update if still pending
            if payment.payment_status in ["successful", "failed"]:
                logger.info(f"Duplicate callback for payment {payment.id} with status {payment.payment_status}")
                return Response({"ResultCode": 0, "ResultDesc": "Already processed"})

            payment.payment_status = "successful" if result_code == 0 else "failed"
            payment.checkout_request_id = checkout_request_id or payment.checkout_request_id
            payment.save()
            logger.info(f"Payment {payment.id} updated to {payment.payment_status}")

            # Notification logic
            try:
                user = payment.patient
                if user and user.email:
                    from django.core.mail import send_mail
                    subject = f"Mpesa Payment {'Success' if payment.payment_status == 'successful' else 'Failure'}"
                    message = (
                        f"Dear {user.first_name or user.username},\n\n"
                        f"Your Mpesa payment of KES {payment.amount} has been marked as {payment.payment_status}.\n"
                        f"If you have any questions, contact support.\n\n"
                        f"Regards,\nInteriorHealth Team"
                    )
                    send_mail(
                        subject,
                        message,
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=True
                    )
                    logger.info(f"Payment notification sent to {user.email}")
            except Exception as notify_err:
                logger.error(f"Failed to send payment notification: {notify_err}")
        else:
            logger.error(f"No matching payment found for callback: checkout_request_id={checkout_request_id}, phone={phone_number}, amount={amount}")
            return Response({"ResultCode": 1, "ResultDesc": "Payment record not found"}, status=404)

        return Response({"ResultCode": 0, "ResultDesc": "Accepted"})
    except Exception as e:
        logger.exception(f"Error processing Mpesa callback: {str(e)}")
        return Response({"ResultCode": 1, "ResultDesc": f"Error: {str(e)}"}, status=500)
