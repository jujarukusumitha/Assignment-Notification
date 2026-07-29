from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Trigger, NotificationTemplate
from .serializers import TriggerSerializer, NotificationTemplateSerializer
from .services.whatsapp import send_whatsapp
from .services.email import send_email
from .services.webpush import send_webpush
from users.models import CustomUser

# ─── Triggers ────────────────────────────────────────────────────────────────

class TriggerListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        triggers = Trigger.objects.all().order_by('id')
        return Response(TriggerSerializer(triggers, many=True).data)

    def post(self, request):
        serializer = TriggerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TriggerDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        trigger = get_object_or_404(Trigger, pk=pk)
        return Response(TriggerSerializer(trigger).data)

    def put(self, request, pk):
        trigger = get_object_or_404(Trigger, pk=pk)
        serializer = TriggerSerializer(trigger, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        trigger = get_object_or_404(Trigger, pk=pk)
        trigger.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# ─── Templates ───────────────────────────────────────────────────────────────

class TemplateListCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trigger_id = request.query_params.get('trigger_id')
        qs = NotificationTemplate.objects.all()
        if trigger_id:
            qs = qs.filter(trigger_id=trigger_id)
        return Response(NotificationTemplateSerializer(qs, many=True).data)

    def post(self, request):
        serializer = NotificationTemplateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TemplateDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        template = get_object_or_404(NotificationTemplate, pk=pk)
        return Response(NotificationTemplateSerializer(template).data)

    def put(self, request, pk):
        template = get_object_or_404(NotificationTemplate, pk=pk)
        serializer = NotificationTemplateSerializer(template, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        template = get_object_or_404(NotificationTemplate, pk=pk)
        template.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TemplateToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        template = get_object_or_404(NotificationTemplate, pk=pk)
        template.is_active = not template.is_active
        template.save()
        return Response({
            'id': template.id,
            'is_active': template.is_active,
            'message': f"Channel {'enabled' if template.is_active else 'disabled'}"
        })

# ─── Test Send ────────────────────────────────────────────────────────────────

class TestSendView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        template = get_object_or_404(NotificationTemplate, pk=pk)
        user = request.user
        context = {
            'username': user.username,
            'email': user.email,
        }
        body = template.body
        for key, val in context.items():
            body = body.replace(f'{{{{{key}}}}}', str(val))

        result = {'channel': template.channel, 'status': 'failed', 'message': ''}

        try:
            if template.channel == 'whatsapp':
                phone = request.data.get('phone') or user.phone_number
                if not phone:
                    return Response({'error': 'Phone number required for WhatsApp test'}, status=400)
                send_whatsapp(phone, body)
                result['status'] = 'sent'
                result['message'] = f'WhatsApp sent to {phone}'

            elif template.channel == 'email':
                email = request.data.get('email') or user.email
                if not email:
                    return Response({'error': 'Email required for email test'}, status=400)
                subject = template.subject or 'Test Notification'
                send_email(email, subject, body)
                result['status'] = 'sent'
                result['message'] = f'Email sent to {email}'

            elif template.channel == 'webpush':
                sub_id = request.data.get('subscription_id') or user.push_subscription_id
                if not sub_id:
                    return Response({'error': 'Push subscription ID required'}, status=400)
                title = template.subject or 'Notification'
                send_webpush(sub_id, title, body)
                result['status'] = 'sent'
                result['message'] = 'Web push sent'

        except Exception as e:
            result['message'] = str(e)

        return Response(result)