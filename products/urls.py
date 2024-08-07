from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductList.as_view()),
    path ('slug/<str:slug>/', views.ProductApiview.as_view()),
    path('<int:pk>/', views.ProductDetail.as_view()),
    path('category/', views.CategoryList.as_view()),
    path('category/<int:pk>/', views.ProductByCategory.as_view()),
    path('promos/', views.PromocionesList.as_view()),
    path('search/<str:name>/', views.SearchProduct.as_view()),

    # Add more paths here
]
