from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from .models import User
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed



# Create your views here.

class UserRetrieveAPIView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserSerializer
    def get_object(self):

        token = self.request.META.get('HTTP_AUTHORIZATION', '').split(' ')[1]
        print(token)
        try:
            user = Token.objects.get(key=token).user
            return user
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token')

    def get_object(self):
        print (self.request.user)
        return self.request.user
