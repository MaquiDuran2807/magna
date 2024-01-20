from rest_framework.routers import DefaultRouter
from .views import ServicioViewSet

router = DefaultRouter()
router.register(r'', ServicioViewSet, basename='servicio')

