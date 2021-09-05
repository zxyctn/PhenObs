from django.contrib.auth.models import Group, User
from django.db import models


class Garden(models.Model):
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    latitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=False, help_text="WGS 84"
    )
    longitude = models.DecimalField(
        max_digits=9, decimal_places=6, blank=False, help_text="WGS 84"
    )
    auth_perm = models.BooleanField(
        "Access permission", default=True, help_text="Restrict viewer access"
    )
    auth_groups = models.ManyToManyField(
        Group, blank=True, verbose_name="Access groups"
    )
    auth_users = models.ManyToManyField(User, blank=True, verbose_name="Access users")