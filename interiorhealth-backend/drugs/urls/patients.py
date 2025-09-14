# drugs/urls/patients.py

from django.urls import path
from drugs.views.patients.drug_views import PatientInventoryListView

urlpatterns = [
    path('inventory/', PatientInventoryListView.as_view(), name='patient-inventory-list'),
]

