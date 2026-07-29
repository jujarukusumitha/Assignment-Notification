from django.db import models

CHANNEL_CHOICES = [
    ('whatsapp', 'WhatsApp'),
    ('email', 'Email'),
    ('webpush', 'Web Push'),
]


class Trigger(models.Model):
    name = models.CharField(max_length=100, unique=True)   # e.g. login
    label = models.CharField(max_length=200)               # e.g. User Login
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.label


class NotificationTemplate(models.Model):
    trigger = models.ForeignKey(
        Trigger,
        on_delete=models.CASCADE,
        related_name="templates"
    )

    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES)
    subject = models.CharField(max_length=300, blank=True)   # Used for Email
    body = models.TextField()
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("trigger", "channel")

    def __str__(self):
        return f"{self.trigger.label} → {self.channel}"


class NotificationLog(models.Model):
    STATUS_CHOICES = [
        ('success', 'Success'),
        ('failed', 'Failed'),
    ]

    trigger = models.ForeignKey(
        Trigger,
        on_delete=models.CASCADE
    )

    channel = models.CharField(max_length=20)
    recipient = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    response = models.TextField(blank=True)
    sent_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.trigger.label} - {self.channel}"


class VariableMapping(models.Model):
    template = models.ForeignKey(
        NotificationTemplate,
        on_delete=models.CASCADE,
        related_name="variables"
    )

    variable_name = models.CharField(max_length=100)
    default_value = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.variable_name