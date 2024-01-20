from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin



# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El email es obligatorio')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        
        user.save(using=self._db)
        
        return user
    

class User(AbstractUser, PermissionsMixin):
    username = None
    email = models.EmailField('email address', unique=True)
    first_name = models.CharField('first name', max_length=150, blank=True)
    last_name = models.CharField('last name', max_length=150, blank=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    is_editor = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
    ]
    
    objects = UserManager()
    
    def __str__(self):
        return self.email
    
    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
