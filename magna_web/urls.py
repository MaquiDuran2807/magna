"""
URL configuration for magna_web project.
"""
from pathlib import Path
from django.contrib import admin
from django.views.generic import TemplateView, View
from django.views.static import serve as static_serve
from django.urls import include, path, re_path
from django.conf.urls.static import static
from django.http import HttpResponse
from django.conf import settings


class indexView(View):
    def get(self, request, *args, **kwargs):
        path = request.path.strip('/')

        if path.startswith('ssg/'):
            path = path[4:]

        prerender_dir = Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'dist' / 'prerendered'
        candidate = prerender_dir / 'index.html' if not path else prerender_dir / path / 'index.html'

        if candidate.exists():
            return HttpResponse(candidate.read_bytes(), content_type='text/html; charset=utf-8')

        spa = Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'dist' / 'index.page.html'
        return HttpResponse(spa.read_bytes(), content_type='text/html; charset=utf-8')


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
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^static/(?P<path>.*)$', static_serve, {'document_root': Path(settings.BASE_DIR) / 'magna-page' / 'unified' / 'dist'})]
urlpatterns += [re_path(r'^store/', storeView.as_view(), name='store')]

urlpatterns += [re_path(r'^ssg/', indexView.as_view(), name='index-ssg')]

# Catch-all principal — debe ir al final
urlpatterns += [re_path(r'^(?!media/|admin/|static/).*$', indexView.as_view(), name='index')]


admin.site.site_header = 'Administrador de Magna'
