# orders/urls/__init__.py
from django.urls import path, include

urlpatterns = [
    path('patient/', include('orders.urls.patient')),
]
