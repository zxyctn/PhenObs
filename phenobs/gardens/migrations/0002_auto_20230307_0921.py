# Generated by Django 3.1.13 on 2023-03-07 08:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gardens', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='garden',
            name='main_garden',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='gardens.garden'),
        ),
        migrations.AlterField(
            model_name='garden',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterUniqueTogether(
            name='garden',
            unique_together={('name', 'main_garden')},
        ),
    ]
