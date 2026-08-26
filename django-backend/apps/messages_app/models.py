from django.conf import settings
from django.db import models


class Message(models.Model):
    """
    Reprend la migration Laravel `messages` (emetteur_id, recepteur_id) —
    les colonnes `auteur` (texte libre) et `citoyen_id` (doublon non relie
    par contrainte) du modele Laravel sont abandonnees au profit de deux
    vraies relations :

    - `citoyen` : le citoyen proprietaire du fil de discussion (toujours
      renseigne, sert au regroupement par conversation cote Espace Agent).
    - `emetteur` : qui a effectivement ecrit ce message (citoyen ou agent).

    Le nom affiche (equivalent de l'ancien champ `auteur`) est derive de
    `emetteur.get_full_name()` dans le serializer plutot que stocke en
    doublon.
    """

    citoyen = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="conversations",
    )
    emetteur = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="messages_envoyes",
    )
    contenu = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]
        verbose_name = "message"
        verbose_name_plural = "messages"

    def __str__(self):
        return f"{self.emetteur} -> conversation #{self.citoyen_id}"
