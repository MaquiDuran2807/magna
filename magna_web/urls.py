"""
URL configuration for magna_web project.
"""
from pathlib import Path
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.static import serve as static_serve
from django.urls import include, path, re_path
from django.conf import settings


class indexView(TemplateView):
    template_name = 'unified/dist/index.page.html'


class storeView(TemplateView):
    template_name = 'unified/dist/index.store.html'


class Robots(TemplateView):
    template_name = 'unified/dist/robot.txt'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('robots.txt', Robots.as_view(), name='robots'),
    re_path('auth/', include('djoser.urls')),
    re_path('auth/', include('djoser.urls.jwt')),
    re_path('auth/', include('djoser.social.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('servicios/', include('servicios.urls')),
    path('equipos/', include('equipos.url')),
    path('proyectos/', include('proyectos.urls')),
    path('frequentQuestions/', include('frequentQuestions.urls')),
    path('contact/', include('contact.urls')),
    path("products/", include("products.urls")),
    path("blog/", include("blog.urls")),
    path('about/', include('about.urls')),
]

urlpatterns += [re_path(r'^media/(?P<path>.*)$', static_serve, {'document_root': settings.MEDIA_ROOT})]
urlpatterns += [re_path(r'^static/(?P<path>.*)$', static_serve, {'document_root': Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'dist'})]
urlpatterns += [re_path(r'^store/', storeView.as_view(), name='store')]

# Catch-all principal — debe ir al final
urlpatterns += [re_path(r'^(?!media/|admin/).*$', indexView.as_view(), name='index')]


admin.site.site_header = 'Administrador de Magna'
