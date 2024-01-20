from django.urls import path
from .views import ContactoApiView

urlpatterns = [
    path('', ContactoApiView.as_view(), name='contacto'),
]
