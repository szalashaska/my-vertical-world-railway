# Generated by Django 4.0.5 on 2022-07-29 11:19

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_route_path_alter_route_image'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Follows',
            new_name='Follow',
        ),
        migrations.RemoveField(
            model_name='route',
            name='image',
        ),
        migrations.AddField(
            model_name='comment',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.location'),
        ),
        migrations.AddField(
            model_name='location',
            name='coordinates',
            field=models.JSONField(null=True),
        ),
        migrations.AddField(
            model_name='location',
            name='likes',
            field=models.ManyToManyField(related_name='liked_locations', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='comment',
            name='route',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.route'),
        ),
        migrations.AlterField(
            model_name='route',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='api.location'),
        ),
        migrations.CreateModel(
            name='Wall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to=api.models.rename_image)),
                ('likes', models.ManyToManyField(related_name='liked_walls', to=settings.AUTH_USER_MODEL)),
                ('location', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='walls', to='api.location')),
            ],
        ),
        migrations.AddField(
            model_name='comment',
            name='wall',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.wall'),
        ),
        migrations.AddField(
            model_name='route',
            name='wall',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='routes', to='api.wall'),
        ),
    ]
