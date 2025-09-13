from django.urls import path
from patients.views import (
    PatientRequestHelpView,
    AssignPatientView, AssignedPatientsListView,
    PatientProfileListCreateView, PatientProfileRetrieveUpdateView,
    MedicalHistoryListCreateView, MedicalHistoryRetrieveUpdateView,
    PatientInteractionListCreateView, PatientInteractionRetrieveUpdateView,
    PatientDashboardView
)

urlpatterns = [
    path('assign/', AssignPatientView.as_view(), name='assign-patient'),
    path('assigned/', AssignedPatientsListView.as_view(), name='assigned-patients'),
    path('request-help/', PatientRequestHelpView.as_view(), name='patient-request-help'),

    # Patient profile CRUD
    path('profiles/', PatientProfileListCreateView.as_view(), name='patient-profile-list-create'),
    path('profiles/<int:pk>/', PatientProfileRetrieveUpdateView.as_view(), name='patient-profile-detail'),

    # Medical history CRUD
    path('medical-history/', MedicalHistoryListCreateView.as_view(), name='medical-history-list-create'),
    path('medical-history/<int:pk>/', MedicalHistoryRetrieveUpdateView.as_view(), name='medical-history-detail'),

    # Patient interaction CRUD
    path('interactions/', PatientInteractionListCreateView.as_view(), name='patient-interaction-list-create'),
    path('interactions/<int:pk>/', PatientInteractionRetrieveUpdateView.as_view(), name='patient-interaction-detail'),

    # Patient dashboard
    path('dashboard/', PatientDashboardView.as_view(), name='patient-dashboard'),
]
