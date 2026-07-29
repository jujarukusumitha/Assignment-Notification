from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    push_subscription_id = models.CharField(max_length=500, blank=True, null=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.username