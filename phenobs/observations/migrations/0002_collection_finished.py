# Generated by Django 3.1.13 on 2022-01-23 22:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('observations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='collection',
            name='finished',
            field=models.BooleanField(default=False),
        ),
    ]