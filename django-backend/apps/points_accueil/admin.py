from django.contrib import admin

from .models import PointAccueil


@admin.register(PointAccueil)
class PointAccueilAdmin(admin.ModelAdmin):
    list_display = ["id", "nom", "type", "ville", "contact"]
    list_filter = ["type", "ville"]
    search_fields = ["nom", "ville", "adresse"]
