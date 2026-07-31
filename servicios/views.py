from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .models import Servicio, SubServicio, Brochure, Slide
from .serializer import (
    BrochureSerializer, ServicioSerializer, subServicesSerializer,
    GetIdServiciosSerializer, ServicesAndSubservicesSerializer,
    SlideSerializer, ServicioSlideSerializer, SubServicioDetailSerializer,
)


def ctx(request):
    return {'request': request}


class ServicioViewSet(viewsets.ViewSet):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        serializer = ServicioSerializer(self.queryset, many=True, context=ctx(request))
        subServices = list(SubServicio.objects.filter().values())
        return Response({
            'servicios': serializer.data,
            'subServicios': subServices,
        })

    def retrieve(self, request, pk=None):
        servicio = get_object_or_404(Servicio, id=pk)
        serializer = ServicioSerializer(servicio, context=ctx(request))
        return Response(serializer.data)

    def create(self, request):
        serializer = ServicioSerializer(data=request.data, context=ctx(request))
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ServicioApiView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk=None):
        if pk is not None:
            servicio = get_object_or_404(Servicio, id=pk)
            subservicios = SubServicio.objects.filter(servicio=servicio)
            serializer = ServicioSerializer(servicio, context=ctx(request))
            subserviciosSerializer = subServicesSerializer(subservicios, many=True, context=ctx(request))
            return Response({
                'servicio': serializer.data,
                'subServicios': subserviciosSerializer.data,
            })
        else:
            servicios = Servicio.objects.all()
            serializer = ServicioSerializer(servicios, many=True, context=ctx(request))
            return Response(serializer.data)

    def post(self, request):
        serializer = ServicioSerializer(data=request.data, context=ctx(request))
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ServicioId(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        servicios = Servicio.objects.filter().values('id', 'nombre')
        serializer = GetIdServiciosSerializer(servicios, many=True)
        return Response(serializer.data)


class ServiciosAndSubservices(ListAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        return Servicio.objects.prefetch_related('subservicio_set').all()


class SlidesAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        servicios = Servicio.objects.all()
        slides = Slide.objects.filter(activo=True)
        servicio_serializer = ServicioSlideSerializer(servicios, many=True, context=ctx(request))
        slide_serializer = SlideSerializer(slides, many=True, context=ctx(request))
        combined = servicio_serializer.data + slide_serializer.data
        combined.sort(key=lambda x: x.get('orden', 0))
        return Response(combined)


class SubServicioDetailView(RetrieveAPIView):
    queryset = SubServicio.objects.all()
    serializer_class = SubServicioDetailSerializer
    lookup_field = 'slug'
    permission_classes = [permissions.AllowAny]


class BrochureApiView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        brochures = Brochure.objects.all()
        serializer = BrochureSerializer(brochures, many=True, context=ctx(request))
        return Response(serializer.data)
