from django.urls import path, include

urlpatterns = [
    path('patients/', include('drugs.urls.patients')),
]
