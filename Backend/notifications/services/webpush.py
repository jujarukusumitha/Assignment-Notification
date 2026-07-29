import requests
from django.conf import settings

def send_webpush(subscription_id: str, title: str, message: str) -> dict:
    """
    Send a web push notification via OneSignal (free tier).
    subscription_id: the OneSignal player/subscription ID
    """
    url = "https://onesignal.com/api/v1/notifications"
    headers = {
        "Authorization": f"Basic {settings.ONESIGNAL_REST_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "app_id": settings.ONESIGNAL_APP_ID,
        "include_player_ids": [subscription_id],
        "headings": {"en": title},
        "contents": {"en": message},
    }
    response = requests.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()
    return response.json()