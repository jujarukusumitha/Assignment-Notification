from django.contrib import admin
from .models import Trigger, NotificationTemplate

@admin.register(Trigger)
class TriggerAdmin(admin.ModelAdmin):
    list_display = ['name', 'label', 'created_at']

@admin.register(NotificationTemplate)
class TemplateAdmin(admin.ModelAdmin):
    list_display = ['trigger', 'channel', 'is_active', 'updated_at']
    list_filter = ['channel', 'is_active']