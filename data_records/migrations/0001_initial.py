# Generated by Django 3.1.13 on 2021-08-18 10:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('data_collections', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('initial_vegetative_growth', models.CharField(max_length=1)),
                ('young_leaves_unfolding', models.CharField(max_length=1)),
                ('flowers_open', models.CharField(max_length=1)),
                ('peak_flowering', models.CharField(max_length=1)),
                ('flowering_intensity', models.IntegerField()),
                ('ripe_fruits', models.CharField(max_length=1)),
                ('senescence', models.CharField(max_length=1)),
                ('senescence_intensity', models.IntegerField()),
                ('maintenance', models.CharField(max_length=100)),
                ('remarks', models.CharField(max_length=100)),
                ('collection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='data_collections.datacollection')),
            ],
        ),
    ]