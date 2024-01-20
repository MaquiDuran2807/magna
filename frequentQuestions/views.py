from django.shortcuts import render
from django.http import HttpResponse
# importar rest_framework
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .models import Pregunta
from .serializer import PreguntaSerializer

class PreguntaApiView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        preguntas = Pregunta.objects.all()
        serializer = PreguntaSerializer(preguntas, many=True)
        return Response(serializer.data)

# Create your views here.




