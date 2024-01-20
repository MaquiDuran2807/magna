from django.urls import path
from .views import PreguntaApiView

urlpatterns = [
    path('', PreguntaApiView.as_view(), name='preguntas'),
]
