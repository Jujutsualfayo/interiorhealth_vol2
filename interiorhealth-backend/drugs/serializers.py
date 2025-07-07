# drugs/serializers.py
from rest_framework import serializers
from .models import Drug

class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = [
            'id',
            'name',
            'description',
            'dosage_form',
            'strength',
            'quantity_available',
            'price',
            'is_active',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
