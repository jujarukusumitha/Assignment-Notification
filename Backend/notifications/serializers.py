from rest_framework import serializers
from .models import Trigger, NotificationTemplate

class NotificationTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationTemplate
        fields = ['id', 'trigger', 'channel', 'subject', 'body', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class TriggerSerializer(serializers.ModelSerializer):
    templates = NotificationTemplateSerializer(many=True, read_only=True)

    class Meta:
        model = Trigger
        fields = ['id', 'name', 'label', 'description', 'templates', 'created_at']
        read_only_fields = ['created_at']