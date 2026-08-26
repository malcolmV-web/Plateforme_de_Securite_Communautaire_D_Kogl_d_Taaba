from rest_framework.permissions import SAFE_METHODS, BasePermission

from apps.accounts.models import User


class IsOwnerOrAgent(BasePermission):
    """
    Correctif IDOR (audit backend Laravel : n'importe quel citoyen/agent
    pouvait lire/modifier/supprimer le signalement de n'importe qui).

    - Un citoyen ne voit/modifie/supprime que SES PROPRES signalements.
    - Un agent peut lire tous les signalements et changer leur statut,
      mais ne peut ni modifier le contenu ni supprimer le signalement
      d'un citoyen (seul l'auteur ou un admin le peut).
    - Un admin a acces complet (supervision).
    """

    def has_object_permission(self, request, view, obj):
        user = request.user

        if user.role == User.Role.ADMIN:
            return True

        if obj.user_id == user.id:
            return True

        if user.role == User.Role.AGENT:
            # Lecture libre + changement de statut uniquement (verifie aussi
            # dans le serializer/la vue : les autres champs sont read_only
            # pour un agent).
            return request.method in SAFE_METHODS or view.action in ("update", "partial_update")

        return False
