from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import UserRetrieveAPIView

urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    path('', UserRetrieveAPIView.as_view(), name='user_retrieve'),
]
