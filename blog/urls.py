from django.urls import path
from . import views

urlpatterns = [
    path('', views.BlogPostApiView.as_view(), name='blog-list'),
    path('<int:id>/', views.BlogPostDetailApiView.as_view(), name='blog-detail'),
    path('recent/', views.BlogPostRecentApiView.as_view(), name='blog-recent'),
    # Agrega aquí más rutas según tus necesidades
]