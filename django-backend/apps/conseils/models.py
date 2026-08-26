from django.db import models


class Conseil(models.Model):
    """Equivalent du modele Laravel Conseil (titre, contenu, categorie, theme, date_publication)."""

    class Categorie(models.TextChoices):
        FAMILLE = "famille", "Famille"
        NUMERIQUE = "numerique", "Numerique"
        HABITATION = "habitation", "Habitation"

    categorie = models.CharField(max_length=20, choices=Categorie.choices)
    titre = models.CharField(max_length=255)
    theme = models.CharField(max_length=255, blank=True, null=True)
    contenu = models.TextField()
    date_publication = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date_publication", "-created_at"]
        verbose_name = "conseil"
        verbose_name_plural = "conseils"

    def __str__(self):
        return self.titre
