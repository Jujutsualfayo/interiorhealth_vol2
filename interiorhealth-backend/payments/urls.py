from django.urls import path
from .views import initiate_payment, mpesa_callback

urlpatterns = [
    path("initiate-payment/", initiate_payment, name="initiate-mpesa-payment"),
    path("mpesa/callback/", mpesa_callback, name="mpesa-callback"),
]
