from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProyectoList.as_view(), name='index'),
    path('images/', views.ImagesProjects.as_view(), name='images'),
    # Agrega aquí tus rutas adicionales
]
