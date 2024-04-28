
from django.urls import include, path, re_path
from .views import ServicioApiView, ServicioId,ServiciosAndSubservices,BrochureApiView
from .routes import router

urlpatterns = [
    path('servicio/<int:pk>/', ServicioApiView.as_view()),
    path('servicio/', ServicioApiView.as_view()),
    path('servicios-id/', ServicioId.as_view()),
    path('servicios-and-subservicios/', ServiciosAndSubservices.as_view()),
    path('brochure/', BrochureApiView.as_view()),
]

urlpatterns += router.urls