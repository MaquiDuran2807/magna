from django.test import TestCase


class IndexViewTests(TestCase):
    def test_index_returns_spa_html(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        content = response.content.decode('utf-8')
        self.assertIn('<div id="root"></div>', content)
        self.assertIn('Magna Ingenier', content)

    def test_spa_route_returns_same_html(self):
        response = self.client.get('/servicios/topografia')
        self.assertEqual(response.status_code, 200)
        content = response.content.decode('utf-8')
        self.assertIn('<div id="root"></div>', content)

    def test_catchall_does_not_intercept_admin(self):
        response = self.client.get('/admin/login/')
        self.assertNotIn('<div id="root"></div>', response.content.decode('utf-8'))

    def test_catchall_does_not_intercept_media(self):
        response = self.client.get('/media/nonexistent.jpg')
        self.assertNotEqual(response.status_code, 200)

    def test_ssg_route_falls_to_spa(self):
        response = self.client.get('/ssg/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('<div id="root"></div>', response.content.decode('utf-8'))
