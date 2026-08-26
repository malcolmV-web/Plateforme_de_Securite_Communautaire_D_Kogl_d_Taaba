from django.contrib import admin

from .models import Conseil


@admin.register(Conseil)
class ConseilAdmin(admin.ModelAdmin):
    list_display = ["id", "titre", "categorie", "theme", "date_publication"]
    list_filter = ["categorie"]
    search_fields = ["titre", "contenu"]
