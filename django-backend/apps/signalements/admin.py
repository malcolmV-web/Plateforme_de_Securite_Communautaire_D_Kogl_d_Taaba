from django.contrib import admin

from .models import Signalement


@admin.register(Signalement)
class SignalementAdmin(admin.ModelAdmin):
    list_display = ["id", "titre", "type", "statut", "user", "lieu", "created_at"]
    list_filter = ["type", "statut"]
    search_fields = ["titre", "description", "lieu"]
