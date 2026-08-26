from django.conf import settings
from django.db import models


class Alerte(models.Model):
    """
    Equivalent du modele Laravel Alerte (ville, niveau, message, admin_id,
    date_publication).
    """

    class Niveau(models.TextChoices):
        INFO = "info", "Info"
        ALERTE = "alerte", "Alerte"
        URGENCE = "urgence", "Urgence"

    message = models.TextField()
    ville = models.CharField(max_length=255)
    niveau = models.CharField(max_length=20, choices=Niveau.choices)
    admin = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="alertes",
    )
    date_publication = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date_publication", "-created_at"]
        verbose_name = "alerte"
        verbose_name_plural = "alertes"

    def __str__(self):
        return f"[{self.niveau}] {self.ville} — {self.message[:40]}"
