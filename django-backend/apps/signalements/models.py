from django.conf import settings
from django.db import models


def signalement_photo_path(instance, filename):
    return f"signalements/{instance.user_id}/{filename}"


class Signalement(models.Model):
    """
    Reprend le modele Laravel (user_id, type, titre, description, lieu,
    statut) + une piece jointe photo, absente cote Laravel.

    Note stockage : `photo` ne stocke QUE le chemin/nom du fichier en base
    (PostgreSQL) ; le fichier lui-meme est ecrit dans MEDIA_ROOT (en
    production : bascule vers un stockage objet S3/Cloudinary via
    DEFAULT_FILE_STORAGE, sans changer ce modele).
    """

    class Type(models.TextChoices):
        VOL = "vol", "Vol"
        AGRESSION = "agression", "Agression"
        CYBERMENACE = "cybermenace", "Cybermenace"
        ARNAQUE = "arnaque", "Arnaque"
        ABUS = "abus", "Abus d'autorite"
        AUTRE = "autre", "Autre"

    class Statut(models.TextChoices):
        EN_ATTENTE = "en attente", "En attente"
        EN_COURS = "en cours", "En cours"
        TRAITE = "traite", "Traite"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="signalements",
    )
    type = models.CharField(max_length=20, choices=Type.choices)
    titre = models.CharField(max_length=255)
    description = models.TextField()
    lieu = models.CharField(max_length=255)
    photo = models.ImageField(upload_to=signalement_photo_path, blank=True, null=True)
    statut = models.CharField(max_length=20, choices=Statut.choices, default=Statut.EN_ATTENTE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "signalement"
        verbose_name_plural = "signalements"

    def __str__(self):
        return f"[{self.statut}] {self.titre}"
