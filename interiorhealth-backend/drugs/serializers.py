# drugs/serializers.py
from rest_framework import serializers
from .models import Drug

class DrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drug
        fields = ['id', 'name', 'description', 'price', 'stock', 'created_at', 'updated_at']
