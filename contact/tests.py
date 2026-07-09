from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Contacto


class ContactTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.valid_data = {
            'nombre': 'Carlos López',
            'telefono': '3001234567',
            'email': 'carlos@example.com',
            'mensaje': 'Quiero información sobre sus servicios',
        }

    def test_create_contacto(self):
        response = self.client.post('/contact/', self.valid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['nombre'], self.valid_data['nombre'])
        self.assertEqual(response.data['email'], self.valid_data['email'])

    def test_create_contacto_saves_to_db(self):
        self.client.post('/contact/', self.valid_data, format='json')
        self.assertEqual(Contacto.objects.count(), 1)
        contacto = Contacto.objects.first()
        self.assertEqual(contacto.nombre, 'Carlos López')

    def test_create_contacto_missing_field(self):
        data = {'nombre': 'Incompleto'}
        response = self.client.post('/contact/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_contacto_empty_payload(self):
        response = self.client.post('/contact/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_contacto_default_contestado_false(self):
        self.client.post('/contact/', self.valid_data, format='json')
        contacto = Contacto.objects.first()
        self.assertFalse(contacto.contestado)
        self.assertIsNotNone(contacto.timestamp)
