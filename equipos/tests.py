from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Equipo, Tenologias


class EquiposTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.equipo = Equipo.objects.create(
            nombre='Juan Pérez',
            descripcion='Ingeniero topógrafo',
            posicion='Director',
        )
        self.tecnologia = Tenologias.objects.create(
            nombre='Drone DJI',
            descripcion='Drone para fotogrametría',
        )

    def test_list_equipos_and_tecnologias(self):
        response = self.client.get('/equipos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('equipos', response.data)
        self.assertIn('tecnologias', response.data)
        self.assertEqual(len(response.data['equipos']), 1)
        self.assertEqual(len(response.data['tecnologias']), 1)

    def test_equipo_has_all_fields(self):
        response = self.client.get('/equipos/')
        equipo = response.data['equipos'][0]
        self.assertEqual(equipo['nombre'], self.equipo.nombre)
        self.assertEqual(equipo['descripcion'], self.equipo.descripcion)
        self.assertEqual(equipo['posicion'], self.equipo.posicion)

    def test_empty_equipos_returns_empty_list(self):
        Equipo.objects.all().delete()
        Tenologias.objects.all().delete()
        response = self.client.get('/equipos/')
        self.assertEqual(len(response.data['equipos']), 0)
        self.assertEqual(len(response.data['tecnologias']), 0)
