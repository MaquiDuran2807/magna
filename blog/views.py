from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import BlogPost
from .serializers import BlogPostSerializer,AllBlogPostSerializer,ImportantBlogPostSerializer


class ProjectPaginacion(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100


@method_decorator(cache_page(60 * 5), name='dispatch')
class BlogPostApiView(ListAPIView):
    queryset = BlogPost.objects.select_related('author', 'category').all()
    serializer_class = AllBlogPostSerializer
    pagination_class = ProjectPaginacion
    permission_classes = (permissions.AllowAny,)

@method_decorator(cache_page(60 * 5), name='dispatch')
class BlogPostDetailApiView(RetrieveAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def get_object(self):
        id = self.kwargs['id']
        return get_object_or_404(BlogPost.objects.select_related('author', 'category'), id=id)
    
# informacion de los blogs mas recientes y los marcados como importantes par un sidebar
@method_decorator(cache_page(60 * 15), name='dispatch')
class BlogPostRecentApiView(ListAPIView):
    serializer_class = ImportantBlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return BlogPost.objects.select_related('author', 'category').filter(important=True).order_by('-date_posted')[:10]
    

class BlogSearchApiView(ListAPIView):
    serializer_class = AllBlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        search = self.request.query_params.get('q', '')
        return BlogPost.objects.select_related('author', 'category').filter(title__icontains=search)