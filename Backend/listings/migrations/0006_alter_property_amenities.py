# Generated by Django 5.1.4 on 2024-12-18 17:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0005_user_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='amenities',
            field=models.ManyToManyField(blank=True, related_name='properties', to='listings.amenity'),
        ),
    ]
