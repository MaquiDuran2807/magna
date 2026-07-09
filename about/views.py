from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import About
from .serializer import AboutSerializer


class AboutDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        about = About.objects.prefetch_related('valores').first()
        if not about:
            return Response({
                'descripcion': '',
                'mision': '',
                'vision': '',
                'valores': []
            })
        serializer = AboutSerializer(about)
        return Response(serializer.data)