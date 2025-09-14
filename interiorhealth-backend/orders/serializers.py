# orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
from drugs.models import InventoryItem

class OrderItemSerializer(serializers.ModelSerializer):
    drug_name = serializers.ReadOnlyField(source='drug.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'drug', 'drug_name', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    patient_email = serializers.ReadOnlyField(source='patient.email')

    class Meta:
        model = Order
        fields = ['id', 'patient_email', 'status', 'total_amount', 'created_at', 'items']
        read_only_fields = ['patient_email', 'items', 'total_amount', 'created_at']


    def create(self, validated_data):
        items_data = validated_data.pop('items')
        patient = self.context['request'].user
        order = Order.objects.create(patient=patient, **validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
