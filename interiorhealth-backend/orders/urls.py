# orders/urls.py
from django.urls import path, include

urlpatterns = [
    path('patient/', include('orders.urls.patient')),
    path('admin/', include('orders.urls.admin')),  # 👈 this
]

