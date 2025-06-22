# drugs/urls/patients.py
from django.urls import path
from drugs.views.patients.drugs import DrugListView

urlpatterns = [
    path('', DrugListView.as_view(), name='patient-drug-list'),
]
