# drugs/urls.py
from django.urls import path, include

urlpatterns = [
    path('patients/', include('drugs.urls.patients')),
    path('manage/', include('drugs.urls.healthworker')),
]
