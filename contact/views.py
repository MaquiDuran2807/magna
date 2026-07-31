from datetime import datetime
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from .models import Contacto
from .serializer import ContactoSerializer
from rest_framework import status


class ContactoApiView(CreateAPIView):
    serializer_class = ContactoSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = ContactoSerializer(data=request.data)
        if serializer.is_valid():
            validated = serializer.validated_data
            serializer.save()

            self._enviar_notificacion(validated)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _enviar_notificacion(self, datos: dict) -> None:
        asunto = f"Nuevo contacto: {datos['nombre']}"
        desde = settings.EMAIL_HOST_USER or 'noreply@magnaingenieriaytopografia.com'
        para = [settings.CONTACT_NOTIFICATION_EMAIL]

        html = render_to_string('contact/email_notification.html', {
            'nombre': datos['nombre'],
            'telefono': datos['telefono'],
            'email': datos['email'],
            'mensaje': datos['mensaje'],
            'consentimiento': datos.get('consentimiento_datos', False),
            'timestamp': datetime.now(),
        })

        bcc = [desde] if desde and desde != para[0] else []

        msg = EmailMultiAlternatives(asunto, '', desde, para, bcc=bcc)
        msg.attach_alternative(html, 'text/html')

        try:
            msg.send(fail_silently=False)
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.error("Error al enviar notificación de contacto: %s", e)
