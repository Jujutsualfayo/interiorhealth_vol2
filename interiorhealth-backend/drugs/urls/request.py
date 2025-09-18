from django.urls import path
from drugs.views.request_drug import RequestDrugView

urlpatterns = [
    path('', RequestDrugView.as_view(), name='request-drug'),
]
