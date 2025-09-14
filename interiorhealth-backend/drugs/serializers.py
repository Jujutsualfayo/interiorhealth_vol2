
# drugs/serializers.py
from rest_framework import serializers
from .models import InventoryItem

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = [
            'id',
            'name',
            'description',
            'category',
            'dosage_form',
            'strength',
            'quantity_available',
            'price',
            'is_active',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
