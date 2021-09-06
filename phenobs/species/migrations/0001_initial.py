# Generated by Django 3.1.13 on 2021-09-06 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Species',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reference_name', models.CharField(max_length=100)),
                ('reference_id', models.IntegerField(unique=True)),
            ],
        ),
    ]
