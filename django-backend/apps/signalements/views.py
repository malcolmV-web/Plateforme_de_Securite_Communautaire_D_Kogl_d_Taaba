from rest_framework import viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser

from apps.accounts.models import User
from apps.accounts.permissions import IsCitoyenOrAgent

from .models import Signalement
from .permissions import IsOwnerOrAgent
from .serializers import SignalementSerializer


class SignalementViewSet(viewsets.ModelViewSet):
    """
    /api/signalements/ — equivalent de SignalementController + route
    apiResource('signalements', ...)->middleware('role:citoyen,agent').

    Le filtrage par role corrige l'IDOR de la version Laravel : un citoyen
    ne recoit dans la liste que ses propres signalements.
    """

    serializer_class = SignalementSerializer
    permission_classes = [IsCitoyenOrAgent, IsOwnerOrAgent]
    # MultiPartParser : permet l'upload de la photo depuis le formulaire
    # "Demarches" du frontend (multipart/form-data), en plus du JSON.
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        user = self.request.user
        queryset = Signalement.objects.select_related("user")
        if user.role == User.Role.CITOYEN:
            return queryset.filter(user=user)
        return queryset
