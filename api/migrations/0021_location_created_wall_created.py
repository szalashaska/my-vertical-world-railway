# Generated by Django 4.0.5 on 2022-10-21 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_remove_location_created_by_remove_wall_created_by_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='wall',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]