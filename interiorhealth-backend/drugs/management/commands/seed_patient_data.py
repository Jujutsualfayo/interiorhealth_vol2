from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from drugs.models import InventoryItem
from orders.models import Order, OrderItem
from patients.models import PatientProfile
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Seed patient, health officer, inventory, and order data for testing.'

    def handle(self, *args, **options):
        # Create Health Officers
        health_officers = []
        for i in range(3):
            officer, created = User.objects.get_or_create(
                email=f"healthofficer{i+1}@test.com",
                defaults={
                    "username": f"healthofficer{i+1}",
                    "role": "health_worker",
                    "is_staff": True,
                    "is_active": True,
                }
            )
            health_officers.append(officer)
        self.stdout.write(self.style.SUCCESS(f"Created {len(health_officers)} health officers."))

        # Create Patients
        patients = []
        for i in range(5):
            user, created = User.objects.get_or_create(
                email=f"patient{i+1}@test.com",
                defaults={
                    "username": f"patient{i+1}",
                    "role": "patient",
                    "is_active": True,
                }
            )
            patient_profile, created = PatientProfile.objects.get_or_create(
                user=user,
                defaults={
                    "full_name": f"Patient {i+1}",
                    "date_of_birth": None,
                    "contact_number": f"07000000{i+1}",
                    "address": f"Address {i+1}",
                    "emergency_contact": f"Emergency {i+1}",
                }
            )
            patients.append(patient_profile)
        self.stdout.write(self.style.SUCCESS(f"Created {len(patients)} patients."))

        # Create Inventory Items
        inventory_data = [
            {"name": "Paracetamol", "description": "Pain relief tablet", "category": "drug", "dosage_form": "Tablet", "strength": "500mg", "quantity_available": 200, "price": 50.00},
            {"name": "Amoxicillin", "description": "Antibiotic capsule", "category": "drug", "dosage_form": "Capsule", "strength": "250mg", "quantity_available": 150, "price": 120.00},
            {"name": "Surgical Mask", "description": "Disposable mask", "category": "supply", "dosage_form": "", "strength": "", "quantity_available": 500, "price": 10.00},
            {"name": "Glucose Meter", "description": "Blood sugar device", "category": "device", "dosage_form": "", "strength": "", "quantity_available": 30, "price": 2500.00},
            {"name": "Vitamin C", "description": "Supplement tablet", "category": "drug", "dosage_form": "Tablet", "strength": "1000mg", "quantity_available": 100, "price": 80.00},
        ]
        items = []
        for data in inventory_data:
            item = InventoryItem.objects.create(
                name=data["name"],
                description=data["description"],
                category=data["category"],
                dosage_form=data["dosage_form"],
                strength=data["strength"],
                quantity_available=data["quantity_available"],
                price=data["price"],
                is_active=True,
            )
            items.append(item)
        self.stdout.write(self.style.SUCCESS(f"Created {len(items)} inventory items."))

        # Create Orders and OrderItems
        status_choices = ["pending", "confirmed", "delivered"]
        for patient in patients:
            for _ in range(2):
                order = Order.objects.create(
                    patient=patient.user,
                    status=random.choice(status_choices),
                    total_amount=0,
                )
                order_items = []
                total = 0
                for _ in range(random.randint(1, 3)):
                    item = random.choice(items)
                    quantity = random.randint(1, 5)
                    price = item.price * quantity
                    order_item = OrderItem.objects.create(
                        order=order,
                        item=item,
                        quantity=quantity,
                        price=item.price,
                    )
                    order_items.append(order_item)
                    total += price
                order.total_amount = total
                order.save()
        self.stdout.write(self.style.SUCCESS("Sample orders created for patients."))

        self.stdout.write(self.style.SUCCESS("Seeding complete!"))
