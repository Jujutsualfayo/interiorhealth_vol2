# drugs/urls/healthworker.py
from django.urls import path
from drugs.views.health_worker.manage_drugs import DrugCreateView, DrugUpdateDeleteView

urlpatterns = [
    path('manage/', DrugCreateView.as_view(), name='drug-create'),
    path('manage/<int:id>/', DrugUpdateDeleteView.as_view(), name='drug-update-delete'),
]

