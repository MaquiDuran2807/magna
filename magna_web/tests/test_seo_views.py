from django.test import TestCase, override_settings
from unittest.mock import patch
from pathlib import Path
import tempfile
import shutil


class IndexViewTests(TestCase):
    def setUp(self):
        self.temp_dir = Path(tempfile.mkdtemp())

        dist = self.temp_dir / 'magna-page' / 'unified' / 'dist'
        dist.mkdir(parents=True)

        self.prerendered = dist / 'prerendered'
        self.prerendered.mkdir()

        self.spa_file = dist / 'index.page.html'
        self.spa_file.write_bytes(
            '<html><head><title>Magna Ingeniería y Topografía</title></head>'
            '<body><div id="root"></div></body></html>'.encode('utf-8')
        )

        servicios_dir = self.prerendered / 'servicios'
        servicios_dir.mkdir(parents=True)
        (servicios_dir / 'index.html').write_bytes(
            '<html><head><title>Servicios | Magna</title>'
            '<meta name="description" content="Servicios de topografía"></head>'
            '<body><div id="root"><h1>Servicios</h1></div></body></html>'.encode('utf-8')
        )

        (self.prerendered / 'index.html').write_bytes(
            '<html><head><title>Magna Ingeniería</title></head>'
            '<body><div id="root"><h1>Bienvenidos</h1></div></body></html>'.encode('utf-8')
        )

    def tearDown(self):
        shutil.rmtree(self.temp_dir)

    @patch('magna_web.urls.Path')
    def test_spa_fallback_when_no_prerendered(self, mock_path):
        mock_path.return_value = self.temp_dir
        response = self.client.get('/ruta-inexistente')
        self.assertEqual(response.status_code, 200)
        content = response.content.decode('utf-8')
        self.assertIn('<div id="root"></div>', content)
        self.assertIn('Magna Ingeniería y Topografía</title>', content)

    @patch('magna_web.urls.Path')
    def test_prerendered_served_when_exists(self, mock_path):
        mock_path.return_value = self.temp_dir
        response = self.client.get('/servicios')
        self.assertEqual(response.status_code, 200)
        content = response.content.decode('utf-8')
        self.assertIn('Servicios | Magna</title>', content)
        self.assertIn('<h1>Servicios</h1>', content)

    @override_settings(DEBUG=True)
    @patch('magna_web.urls.Path')
    def test_ssg_route_dev_mode(self, mock_path):
        mock_path.return_value = self.temp_dir
        response = self.client.get('/ssg/servicios')
        self.assertEqual(response.status_code, 200)
        content = response.content.decode('utf-8')
        self.assertIn('<h1>Servicios</h1>', content)

    @patch('magna_web.urls.Path')
    def test_prerendered_has_meta_description(self, mock_path):
        mock_path.return_value = self.temp_dir
        response = self.client.get('/servicios')
        content = response.content.decode('utf-8')
        self.assertIn('meta name="description"', content)
        self.assertIn('Servicios de topografía', content)

    @patch('magna_web.urls.Path')
    def test_homepage_prerendered(self, mock_path):
        mock_path.return_value = self.temp_dir
        response = self.client.get('/')
        content = response.content.decode('utf-8')
        self.assertIn('Magna Ingeniería</title>', content)
        self.assertIn('Bienvenidos', content)
