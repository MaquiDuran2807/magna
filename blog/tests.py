from django.test import TestCase, override_settings
from rest_framework.test import APIClient
from rest_framework import status
from .models import BlogPost, Category
from user.models import User


@override_settings(CACHES={'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache'}})
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
        self.assertIn('image', response.data['results'][0])

    def test_blog_post_detail(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.post.title)

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
        response = self.client.get('/blog/search/?q=total')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_blog_search_no_results(self):
        response = self.client.get('/blog/search/?q=noexiste')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_blog_search_special_chars(self):
        response = self.client.get('/blog/search/?q=estación+total')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_blog_detail_not_found(self):
        response = self.client.get('/blog/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_blog_post_has_image_field(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('image', response.data)
        self.assertNotIn('image_blog', response.data)

    def test_blog_list_query_count(self):
        cat2 = Category.objects.create(name='Geodesia')
        BlogPost.objects.create(
            title='Post con categoría',
            description='Test',
            content='<p>Content</p>',
            author=self.author,
            important=False,
            category=cat2,
        )
        with self.assertNumQueries(2):
            response = self.client.get('/blog/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_blog_detail_full_data(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('id', response.data)
        self.assertIn('title', response.data)
        self.assertIn('description', response.data)
        self.assertIn('content', response.data)
        self.assertIn('image', response.data)
        self.assertIn('date_posted', response.data)
        self.assertIn('important', response.data)
        self.assertIn('author', response.data)
        self.assertIn('category', response.data)
        self.assertIn('comments', response.data)

    def test_blog_post_has_author_info(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertIn('author', response.data)
        self.assertEqual(response.data['author']['email'], 'author@example.com')

    def test_blog_post_has_category_info(self):
        response = self.client.get(f'/blog/{self.post.id}/')
        self.assertIn('category', response.data)
        self.assertEqual(response.data['category']['name'], 'Topografía')

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
