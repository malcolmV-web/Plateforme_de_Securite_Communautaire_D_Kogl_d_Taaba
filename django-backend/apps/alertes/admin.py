from django.contrib import admin

from .models import Alerte


@admin.register(Alerte)
class AlerteAdmin(admin.ModelAdmin):
    list_display = ["id", "niveau", "ville", "admin", "date_publication"]
    list_filter = ["niveau", "ville"]
    search_fields = ["message", "ville"]
