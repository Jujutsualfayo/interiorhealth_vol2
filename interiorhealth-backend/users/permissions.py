from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to users with role 'admin'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsHealthWorker(permissions.BasePermission):
    """
    Allows access only to health workers.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'health_worker'
    
class IsPatient(permissions.BasePermission):
    """
    Allows access only to patients.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'patient'
