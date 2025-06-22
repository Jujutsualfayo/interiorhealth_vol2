# drugs/urls.py
from django.urls import path, include
from django.urls import path
from drugs.views.patients.drug_views import PatientDrugListView

urlpatterns = [
    path('patients/', include('drugs.urls.patients')),
]
