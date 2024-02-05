from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework import permissions
from .models import Proyecto,ProyectoImagen
from .serializer import ProyectoSerializer,ProyectoImagenSerializer

class ProjectPaginacion(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProyectoList(ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ProyectoSerializer
    pagination_class = ProjectPaginacion
    queryset = Proyecto.objects.all()
    

class ImagesProjects(ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = ProyectoImagenSerializer
    queryset = ProyectoImagen.objects.all()
   

