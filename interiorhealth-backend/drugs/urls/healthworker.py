# drugs/urls/healthworker.py
from django.urls import path
from drugs.views.health_worker.manage_drugs import DrugCreateView, DrugUpdateDeleteView



urlpatterns = [
    path('create/', DrugCreateView.as_view(), name='create-drug'),
    path('<int:id>/', DrugUpdateDeleteView.as_view(), name='update-delete-drug'),
]
