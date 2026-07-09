from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Servicio, Characteristic, SubServicio, Brochure
from django.core.files.uploadedfile import SimpleUploadedFile


class ServiciosTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.servicio = Servicio.objects.create(
            nombre='Topografía',
            descripcion='Servicio de topografía profesional',
        )
        self.caracteristica = Characteristic.objects.create(
            servicio=self.servicio,
            nombre='Precisión',
            descripcion='Alta precisión milimétrica',
        )
        self.subservicio = SubServicio.objects.create(
            servicio=self.servicio,
            nombre='Levantamiento',
            descripcion='Levantamiento topográfico',
        )
        self.brochure = Brochure.objects.create(
            nombre='Brochure Topografía',
            archivo=SimpleUploadedFile('test.pdf', b'%PDF-1.4 fake content', content_type='application/pdf'),
        )

    def test_list_servicios(self):
        response = self.client.get('/servicios/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_retrieve_servicio_by_pk(self):
        response = self.client.get(f'/servicios/{self.servicio.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nombre'], self.servicio.nombre)

    def test_retrieve_servicio_includes_subservicios(self):
        response = self.client.get(f'/servicios/{self.servicio.id}/')
        self.assertIn('subservicios', response.data)
        self.assertEqual(len(response.data['subservicios']), 1)

    def test_retrieve_servicio_includes_caracteristicas(self):
        response = self.client.get(f'/servicios/{self.servicio.id}/')
        self.assertIn('caracteristicas', response.data)
        self.assertEqual(len(response.data['caracteristicas']), 1)

    def test_servicio_api_view_list(self):
        response = self.client.get('/servicios/servicio/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_servicio_api_view_detail(self):
        response = self.client.get(f'/servicios/servicio/{self.servicio.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['servicio']['nombre'], self.servicio.nombre)

    def test_servicios_id(self):
        response = self.client.get('/servicios/servicios-id/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('id', response.data[0])
        self.assertIn('nombre', response.data[0])

    def test_servicios_and_subservicios(self):
        response = self.client.get('/servicios/servicios-and-subservicios/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('subservicios', response.data[0])

    def test_brochure_list(self):
        response = self.client.get('/servicios/brochure/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_servicio_not_found_returns_404(self):
        response = self.client.get('/servicios/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
