from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProyectoList.as_view(), name='index'),
    # Agrega aquí tus rutas adicionales
]
