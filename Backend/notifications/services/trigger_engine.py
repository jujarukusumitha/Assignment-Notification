from ..models import Trigger, NotificationTemplate
from .whatsapp import send_whatsapp
from .email import send_email
from .webpush import send_webpush


def fire_trigger(trigger_name: str, user) -> None:
    try:
        trigger = Trigger.objects.get(name=trigger_name)
    except Trigger.DoesNotExist:
        return

    templates = NotificationTemplate.objects.filter(trigger=trigger, is_active=True)

    context = {
        'username': user.username,
        'email': user.email,
        'phone': user.phone_number or '',
    }

    for template in templates:
        body = _render(template.body, context)
        subject = _render(template.subject or 'Notification', context)

        try:
            if template.channel == 'whatsapp' and user.phone_number:
                send_whatsapp(user.phone_number, body)
            elif template.channel == 'email' and user.email:
                send_email(user.email, subject, body)
            elif template.channel == 'webpush' and user.push_subscription_id:
                send_webpush(user.push_subscription_id, subject, body)
        except Exception as e:
            print(f"[TriggerEngine] Error sending {template.channel} for {trigger_name}: {e}")


def _render(text: str, context: dict) -> str:
    for key, value in context.items():
        text = text.replace(f'{{{{{key}}}}}', str(value))
    return text
