from django.urls import path
from . import views

urlpatterns = [
    path('', views.EquipoList.as_view()),
]
