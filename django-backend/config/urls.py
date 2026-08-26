from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.accounts.urls")),
    path("api/", include("apps.signalements.urls")),
    path("api/", include("apps.alertes.urls")),
    path("api/", include("apps.conseils.urls")),
    path("api/", include("apps.messages_app.urls")),
    path("api/", include("apps.points_accueil.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
