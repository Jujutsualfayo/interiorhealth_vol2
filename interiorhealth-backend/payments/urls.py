from django.urls import path
from .views import initiate_mpesa_payment, payment_success

urlpatterns = [
    path("initiate-payment/", initiate_mpesa_payment, name="initiate-mpesa-payment"),
    path("success/", payment_success, name="payment-success"),
]
