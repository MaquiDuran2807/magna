from django.shortcuts import render
from django.http import HttpResponse
# importar rest_framework
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from .models import Contacto
from .serializer import ContactoSerializer
# Create your views here.


class ContactoApiView(CreateAPIView):
    # queryset = Contacto.objects.all()
    serializer_class = ContactoSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = ContactoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)