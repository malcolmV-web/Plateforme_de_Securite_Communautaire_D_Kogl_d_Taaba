from rest_framework.permissions import SAFE_METHODS, BasePermission

from .models import User


class IsAdmin(BasePermission):
    """Autorise uniquement le role admin (equivalent du middleware role:admin)."""

    message = "Acces reserve aux administrateurs."

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == User.Role.ADMIN)


class IsCitoyenOrAgent(BasePermission):
    """Autorise les roles citoyen et agent (equivalent role:citoyen,agent)."""

    message = "Acces reserve aux citoyens et agents."

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in (User.Role.CITOYEN, User.Role.AGENT)
        )


class IsAuthenticatedReadOnlyOrAdminWrite(BasePermission):
    """
    Lecture (GET/HEAD/OPTIONS) ouverte a tout utilisateur authentifie,
    ecriture (POST/PUT/PATCH/DELETE) reservee au role admin.

    Utilise pour Alerte : contrairement au backend Laravel (routes/api.php)
    qui mettait toute la ressource, y compris la lecture, derriere
    `role:admin`, une alerte de securite n'a de sens que si les
    citoyens/agents peuvent la consulter. Seule la publication reste
    reservee a l'admin.
    """

    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.method in SAFE_METHODS:
            return True
        return request.user.role == User.Role.ADMIN


class IsPubliclyReadableAdminWritable(BasePermission):
    """
    Lecture publique (sans authentification), ecriture reservee au role
    admin. Reprend le comportement des routes publiques /conseils et
    /points-accueil du backend Laravel.
    """

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.role == User.Role.ADMIN)
