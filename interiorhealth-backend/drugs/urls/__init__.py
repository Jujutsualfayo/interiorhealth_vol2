from django.urls import path, include

urlpatterns = [
    path('patients/', include('drugs.urls.patients')),
    path('healthworker/', include('drugs.urls.healthworker')),
]
