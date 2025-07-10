# orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
from drugs.models import Drug

class OrderItemSerializer(serializers.ModelSerializer):
    drug_name = serializers.ReadOnlyField(source='drug.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'drug', 'drug_name', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    patient_email = serializers.ReadOnlyField(source='patient.email')
    status = serializers.CharField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'patient_email', 'status', 'ordered_at', 'items']
        read_only_fields = ['status', 'ordered_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        patient = self.context['request'].user
        order = Order.objects.create(patient=patient, **validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
