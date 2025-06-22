# drugs/urls/patients.py
from django.urls import path
from drugs.views.patients.drug_views import PatientDrugListView

urlpatterns = [
    path('drugs/', PatientDrugListView.as_view(), name='patient-drug-list'),
]

