from django.db import models


class PointAccueil(models.Model):
    """Equivalent du modele Laravel PointAccueil (table points_accueil)."""

    nom = models.CharField(max_length=255)
    type = models.CharField(max_length=255)  # commissariat, gendarmerie, pompier, etc.
    ville = models.CharField(max_length=255)
    adresse = models.TextField(blank=True, null=True)
    contact = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "points_accueil"
        ordering = ["ville", "nom"]
        verbose_name = "point d'accueil"
        verbose_name_plural = "points d'accueil"

    def __str__(self):
        return f"{self.nom} ({self.ville})"
