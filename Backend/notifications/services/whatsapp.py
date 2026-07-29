import requests
from django.conf import settings

def send_whatsapp(to_phone: str, message: str) -> dict:
    """
    Send a WhatsApp text message via Meta Cloud API (sandbox).
    to_phone: recipient phone in international format e.g. +919876543210
    """
    url = f"https://graph.facebook.com/v18.0/{settings.PHONE_NUMBER_ID}/messages"
    headers = {
        "Authorization": f"Bearer {settings.WHATSAPP_ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "messaging_product": "whatsapp",
        "to": to_phone,
        "type": "text",
        "text": {"body": message},
    }
    response = requests.post(url, json=payload, headers=headers, timeout=10)
    response.raise_for_status()
    return response.json()