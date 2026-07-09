from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Proyecto, TypeProject, Pais, Departamento, Ciudad, Client, ProyectoImagen
from servicios.models import Servicio, SubServicio
from equipos.models import Equipo
from datetime import date


class ProyectosTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.tipo = TypeProject.objects.create(name='Topografía')
        self.pais = Pais.objects.create(nombre='Colombia')
        self.departamento = Departamento.objects.create(nombre='Tolima', pais=self.pais)
        self.ciudad = Ciudad.objects.create(nombre='Ibagué', departamento=self.departamento)
        self.servicio = Servicio.objects.create(nombre='Topografía', descripcion='Servicio de topografía')
        self.subservicio = SubServicio.objects.create(
            servicio=self.servicio, nombre='Levantamiento', descripcion='Levantamiento topográfico'
        )
        self.proyecto = Proyecto.objects.create(
            nombre='Proyecto Test',
            descripcion='Descripción del proyecto',
            tipo=self.tipo,
            fecha_inicio=date(2024, 1, 1),
            fecha_fin=date(2024, 6, 30),
            estado='Finalizado',
            ciudad=self.ciudad,
        )
        self.proyecto.servicios.add(self.servicio)
        self.proyecto.subservicios.add(self.subservicio)

    def test_list_proyectos_paginated(self):
        response = self.client.get('/proyectos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertIn('count', response.data)

    def test_proyecto_has_related_data(self):
        response = self.client.get('/proyectos/')
        proyecto = response.data['results'][0]
        self.assertEqual(proyecto['nombre'], self.proyecto.nombre)
        self.assertIn('servicios', proyecto)
        self.assertIn('subservicios', proyecto)
        self.assertIn('ciudad', proyecto)
        self.assertIn('tipo', proyecto)

    def test_proyecto_ciudad_nested(self):
        response = self.client.get('/proyectos/')
        proyecto = response.data['results'][0]
        self.assertEqual(proyecto['ciudad']['nombre'], 'Ibagué')
        self.assertEqual(proyecto['ciudad']['departamento']['nombre'], 'Tolima')
        self.assertEqual(proyecto['ciudad']['departamento']['pais']['nombre'], 'Colombia')

    def test_proyectos_images_empty(self):
        response = self.client.get('/proyectos/images/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_pagination_size(self):
        for i in range(10):
            p = Proyecto.objects.create(
                nombre=f'Proyecto {i}',
                descripcion='Test',
                tipo=self.tipo,
                fecha_inicio=date(2024, 1, 1),
                fecha_fin=date(2024, 6, 30),
                estado='Finalizado',
                ciudad=self.ciudad,
            )
            p.servicios.add(self.servicio)
            p.subservicios.add(self.subservicio)
        response = self.client.get('/proyectos/')
        self.assertEqual(len(response.data['results']), 8)
