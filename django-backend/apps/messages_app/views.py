from rest_framework import viewsets

from apps.accounts.models import User
from apps.accounts.permissions import IsCitoyenOrAgent

from .models import Message
from .serializers import MessageSerializer


class MessageViewSet(viewsets.ModelViewSet):
    """
    /api/messages/ — equivalent de MessageController + role:citoyen,agent.

    Correctif IDOR : un citoyen ne recoit/n'agit que sur les messages de
    SA propre conversation (`citoyen=request.user`) ; un agent voit toutes
    les conversations, pour pouvoir y repondre.
    """

    serializer_class = MessageSerializer
    permission_classes = [IsCitoyenOrAgent]

    def get_queryset(self):
        user = self.request.user
        queryset = Message.objects.select_related("citoyen", "emetteur")
        if user.role == User.Role.CITOYEN:
            return queryset.filter(citoyen=user)
        return queryset
