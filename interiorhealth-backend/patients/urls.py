from django.urls import path
from patients.views import AssignPatientView, AssignedPatientsListView

urlpatterns = [
    path('assign/', AssignPatientView.as_view(), name='assign-patient'),
    path('assigned/', AssignedPatientsListView.as_view(), name='assigned-patients'),
]
