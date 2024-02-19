from djoser.serializers import UserCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from rest_framework import serializers

from django.contrib.auth import get_user_model
User = get_user_model()

class UserInforSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
        ]


class UserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            'id',
            'email',
            'first_name',
            'last_name',
            'is_active',
            'is_staff',
            'is_editor',
        ]

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user

        # you can do all sort of things here !!!
        # let me try something crazy if a user's last login is less than 2-minutes we deny
        # them access to the system 🤣🤣🤣🥲
        '''
        current_time = datetime.now()
        two_minutes_ago = current_time - timedelta(minutes=2)
        if obj.last_login > two_minutes_ago :
            raise ValidationError(
                'You are not allowed to login at this time wait for 2 minutes ')

        
        '''
        # if obj.is_deactivated:
        #     raise ValidationError(
        #         'Account deactivated. Account deactivated!!')

        # if not obj.is_active:
        #     raise ValidationError(
        #         'Account not activated. go to your email and activate your account')

        data.update({
            'id': obj.id, 'first_name': obj.first_name,
            'last_name': obj.last_name, 'email': obj.email,
            'is_staff': obj.is_staff, 'is_editor': obj.is_editor,
        })

        return data