# drugs/urls/healthworker.py
from django.urls import path
from drugs.views.health_worker.manage_drugs import InventoryItemCreateView, InventoryItemUpdateDeleteView

urlpatterns = [
    path('manage/', InventoryItemCreateView.as_view(), name='inventoryitem-create'),
    path('manage/<int:id>/', InventoryItemUpdateDeleteView.as_view(), name='inventoryitem-update-delete'),
]

