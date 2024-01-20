
from django.urls import include, path, re_path
from .views import ServicioApiView, ServicioId
from .routes import router

urlpatterns = [
    path('servicio/<int:pk>/', ServicioApiView.as_view()),
    path('servicio/', ServicioApiView.as_view()),
    path('servicios-id/', ServicioId.as_view()),
]

urlpatterns += router.urls