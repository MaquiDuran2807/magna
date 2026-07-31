from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import BlogPost
from .serializers import BlogPostSerializer, AllBlogPostSerializer, ImportantBlogPostSerializer


class ProjectPaginacion(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'
    max_page_size = 100


class BlogPostApiView(ListAPIView):
    queryset = BlogPost.objects.select_related('author', 'category').all()
    serializer_class = AllBlogPostSerializer
    pagination_class = ProjectPaginacion
    permission_classes = (permissions.AllowAny,)


class BlogPostDetailApiView(RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'id'


class BlogPostRecentApiView(ListAPIView):
    serializer_class = ImportantBlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return BlogPost.objects.filter(important=True).order_by('-date_posted')[:10]


class BlogSearchApiView(ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        search = self.request.query_params.get('q', '')
        return BlogPost.objects.filter(title__icontains=search)