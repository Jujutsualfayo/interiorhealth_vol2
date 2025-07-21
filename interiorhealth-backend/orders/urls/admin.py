from django.urls import path
from orders.views.admin.order_admin_views import AdminOrderListView, AdminOrderUpdateView

urlpatterns = [
    path('all/', AdminOrderListView.as_view(), name='admin-order-list'),
    path('<int:id>/update/', AdminOrderUpdateView.as_view(), name='admin-order-update'),
]
