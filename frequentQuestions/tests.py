from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Pregunta


class FrequentQuestionsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        Pregunta.objects.all().delete()
        self.pregunta1 = Pregunta.objects.create(
            pregunta='¿Qué servicios ofrecen?',
            respuesta='Ofrecemos topografía, geodesia y más.',
        )
        self.pregunta2 = Pregunta.objects.create(
            pregunta='¿Cuánto tiempo toma un levantamiento?',
            respuesta='Depende del tamaño del terreno.',
        )

    def test_list_preguntas(self):
        response = self.client.get('/frequentQuestions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_pregunta_has_all_fields(self):
        response = self.client.get('/frequentQuestions/')
        pregunta = response.data[0]
        self.assertIn('id', pregunta)
        self.assertIn('pregunta', pregunta)
        self.assertIn('respuesta', pregunta)

    def test_empty_list(self):
        Pregunta.objects.all().delete()
        response = self.client.get('/frequentQuestions/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
