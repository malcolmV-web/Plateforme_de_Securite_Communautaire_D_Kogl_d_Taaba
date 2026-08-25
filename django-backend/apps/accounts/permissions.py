from rest_framework.permissions import BasePermission

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
