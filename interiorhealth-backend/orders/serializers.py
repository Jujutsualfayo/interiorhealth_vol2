# orders/serializers.py
from rest_framework import serializers
from .models import Order, OrderItem
from drugs.models import InventoryItem

class OrderItemSerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField(source='item.name')

    class Meta:
        model = OrderItem
        fields = ['id', 'item', 'item_name', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    patient_email = serializers.ReadOnlyField(source='patient.email')

    class Meta:
        model = Order
        fields = ['id', 'patient_email', 'status', 'total_amount', 'address', 'created_at', 'items']
    read_only_fields = ['patient_email', 'items', 'created_at']

    def create(self, validated_data):
        print("DEBUG: validated_data:", validated_data)
        items_data = validated_data.pop('items')
        print("DEBUG: items_data:", items_data)
        address = validated_data.pop('address', None)
        total_amount = validated_data.pop('total_amount', None)
        patient = self.context['request'].user
        order = Order.objects.create(
            patient=patient,
            address=address,
            total_amount=total_amount,
            **validated_data
        )
        for item_data in items_data:
            item_instance = item_data['item']
            price = getattr(item_instance, 'price', None)
            print(f"DEBUG: Creating OrderItem with: {item_data}, price: {price}")
            OrderItem.objects.create(order=order, item=item_instance, quantity=item_data['quantity'], price=price)
        print("DEBUG: Order created:", order)
        return order
