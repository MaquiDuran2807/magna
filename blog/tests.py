from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import BlogPost, Category
from user.models import User


class BlogTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.author = User.objects.create_user(
            email='author@example.com',
            password='AuthorPass123!',
            first_name='Author',
        )
        self.category = Category.objects.create(name='Topografía')
        self.post = BlogPost.objects.create(
            title='Cómo usar una estación total',
            description='Guía práctica',
            content='<p>Contenido del artículo</p>',
            author=self.author,
            important=True,
            category=self.category,
        )

    def test_list_blog_posts(self):
        response = self.client.get('/blog/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('results', response.data)
        self.assertGreaterEqual(len(response.data['results']), 1)

    def test_blog_post_detail(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data[0]['title'], self.post.title)

    def test_blog_post_recent(self):
        response = self.client.get('/blog/recent/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_blog_post_recent_only_important(self):
        BlogPost.objects.create(
            title='No importante',
            description='No debe aparecer',
            content='<p>Test</p>',
            author=self.author,
            important=False,
        )
        response = self.client.get('/blog/recent/')
        for post in response.data:
            self.assertTrue(post['important'])

    def test_blog_search(self):
        response = self.client.get('/blog/search/total/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_blog_search_no_results(self):
        response = self.client.get('/blog/search/noexiste/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_blog_post_has_author_info(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertIn('author', response.data[0])
        self.assertEqual(response.data[0]['author']['email'], 'author@example.com')

    def test_blog_post_has_category_info(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertIn('category', response.data[0])
        self.assertEqual(response.data[0]['category']['name'], 'Topografía')

    def test_blog_pagination_size(self):
        for i in range(10):
            BlogPost.objects.create(
                title=f'Post {i}',
                description='Test',
                content='<p>Content</p>',
                author=self.author,
            )
        response = self.client.get('/blog/')
        self.assertEqual(len(response.data['results']), 5)
