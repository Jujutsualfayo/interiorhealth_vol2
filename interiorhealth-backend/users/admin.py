from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from users.models import User

class CustomUserAdmin(BaseUserAdmin):
    # Your custom fieldsets or list_display config goes here

    def has_module_permission(self, request):
        """
        Controls visibility of the 'Users' app in the admin dashboard.
        """
        return request.user.is_authenticated and request.user.role == 'admin'

    def has_view_permission(self, request, obj=None):
        """
        Controls access to the model's changelist view.
        """
        return request.user.is_authenticated and request.user.role == 'admin'

    def has_add_permission(self, request):
        return request.user.role == 'admin'

    def has_change_permission(self, request, obj=None):
        return request.user.role == 'admin'

    def has_delete_permission(self, request, obj=None):
        return request.user.role == 'admin'

# Register the model with your custom admin
admin.site.register(User, CustomUserAdmin)

