from django.contrib import admin
from patients.models import PatientAssignment

@admin.register(PatientAssignment)
class PatientAssignmentAdmin(admin.ModelAdmin):
    list_display = ('patient', 'health_worker', 'assigned_at')
    search_fields = ('patient__email', 'health_worker__email')
