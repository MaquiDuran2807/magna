"""
URL configuration for magna_web project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.http import JsonResponse
from django.conf import settings



class indexView(TemplateView):
    template_name = 'page/dist/magnapage.html'

class storeView(TemplateView):
    template_name = 'store/dist/index.html'

class Robots(TemplateView):
    template_name = 'page/dist/robot.txt'




urlpatterns = [
    path('admin/', admin.site.urls),
    path('robots.txt', Robots.as_view(), name='robots'),
    re_path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.jwt')),
    re_path('auth/', include('djoser.social.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('servicios/',include('servicios.urls')),
    path('equipos/',include('equipos.url')),
    path('proyectos/',include('proyectos.urls')),
    path('frequentQuestions/',include('frequentQuestions.urls')), 
    path('contact/',include('contact.urls')),
    path("products/",include("products.urls")),
    path("blog/",include("blog.urls")),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r'^store/', storeView.as_view(), name='store')]
urlpatterns += [re_path(r'^(?!media/|admin/).*$', indexView.as_view(), name='index')]


admin.site.site_header = 'Administrador de Magna'