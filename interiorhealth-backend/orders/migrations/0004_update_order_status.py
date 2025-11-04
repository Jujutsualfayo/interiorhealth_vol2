from django.db import migrations, models


def forwards_update_confirmed_to_dispatched(apps, schema_editor):
    Order = apps.get_model('orders', 'Order')
    Order.objects.filter(status='confirmed').update(status='dispatched')


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_order_address'),
    ]

    operations = [
        migrations.RunPython(forwards_update_confirmed_to_dispatched, reverse_code=migrations.RunPython.noop),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(max_length=20, choices=[('pending', 'Pending'), ('dispatched', 'Dispatched'), ('delivered', 'Delivered')], default='pending'),
        ),
    ]
