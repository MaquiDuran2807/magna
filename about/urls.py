from django.urls import path
from . import views

urlpatterns = [
    path('', views.AboutDetail.as_view()),
]