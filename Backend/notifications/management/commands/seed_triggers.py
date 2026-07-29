from django.core.management.base import BaseCommand
from notifications.models import Trigger

class Command(BaseCommand):
    help = 'Seed default triggers'

    def handle(self, *args, **kwargs):
        triggers = [
            {'name': 'login', 'label': 'User Login', 'description': 'Fires when user logs in'},
            {'name': 'logout', 'label': 'User Logout', 'description': 'Fires when user logs out'},
            {'name': 'inactive_1_day', 'label': 'Not logged in 1 day', 'description': 'User inactive for 24h'},
            {'name': 'inactive_1_week', 'label': 'Not logged in 1 week', 'description': 'User inactive for 7 days'},
            {'name': 'password_reset', 'label': 'Password Reset', 'description': 'User requested password reset'},
        ]
        for t in triggers:
            obj, created = Trigger.objects.get_or_create(name=t['name'], defaults=t)
            status = 'Created' if created else 'Already exists'
            self.stdout.write(f"{status}: {t['label']}")