from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import Category, Product, Promociones
from decimal import Decimal


class ProductsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.category = Category.objects.create(name='Instrumentos')
        self.product = Product.objects.create(
            name='Estación Total',
            slug='estacion-total',
            category=self.category,
            brand='Leica',
            price=Decimal('15000.00'),
            countInStock=5,
            description='Estación total de alta precisión',
            rating=Decimal('4.5'),
            numReviews=10,
        )
        self.promo = Promociones.objects.create(
            name='Descuento Verano',
            description='20% off',
            discount=Decimal('20.00'),
        )
        self.promo.products.add(self.product)

    def test_list_products(self):
        response = self.client.get('/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_product_by_slug(self):
        response = self.client.get('/products/slug/estacion-total/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['name'], self.product.name)

    def test_product_by_id(self):
        response = self.client.get(f'/products/{self.product.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.product.name)

    def test_product_not_found(self):
        response = self.client.get('/products/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_list_categories(self):
        response = self.client.get('/products/category/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_products_by_category(self):
        response = self.client.get(f'/products/category/{self.category.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_products_by_category_empty(self):
        new_cat = Category.objects.create(name='Vacíos')
        response = self.client.get(f'/products/category/{new_cat.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_list_promos(self):
        response = self.client.get('/products/promos/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertIn('products', response.data[0])

    def test_search_product(self):
        response = self.client.get('/products/search/Total/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_search_product_no_results(self):
        response = self.client.get('/products/search/NoExiste/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_product_has_nested_category(self):
        response = self.client.get(f'/products/{self.product.id}/')
        self.assertIn('category', response.data)
        self.assertEqual(response.data['category']['name'], 'Instrumentos')
