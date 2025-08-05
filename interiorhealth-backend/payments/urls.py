from django.urls import path
from .views import initiate_mpesa_payment

urlpatterns = [
    path("initiate-payment/", initiate_mpesa_payment, name="initiate-mpesa-payment"),
]
