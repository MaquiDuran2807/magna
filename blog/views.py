from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import  ListAPIView
from rest_framework import permissions
from .models import BlogPost
from .serializers import BlogPostSerializer,AllBlogPostSerializer,ImportantBlogPostSerializer


class ProjectPaginacion(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 100


class BlogPostApiView(ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = AllBlogPostSerializer
    pagination_class = ProjectPaginacion
    permission_classes = (permissions.AllowAny,)

class BlogPostDetailApiView(ListAPIView):
    serializer_class = BlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        # Obtenemos el id del post
        id = self.kwargs['id']
        return BlogPost.objects.filter(id=id)
    
# informacion de los blogs mas recientes y los marcados como importantes par un sidebar
class BlogPostRecentApiView(ListAPIView):
    serializer_class = ImportantBlogPostSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        return BlogPost.objects.filter(important=True).order_by('-date_posted')[:10]
    
