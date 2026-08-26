from rest_framework import viewsets

from apps.accounts.permissions import IsAuthenticatedReadOnlyOrAdminWrite

from .models import Alerte
from .serializers import AlerteSerializer


class AlerteViewSet(viewsets.ModelViewSet):
    """
    /api/alertes/ — remplace AlerteController (casse cote Laravel, voir
    audit). Lecture ouverte a tout utilisateur connecte (citoyen/agent/
    admin) puisqu'une alerte de securite doit etre visible par tous ;
    seule la publication/modification/suppression reste reservee a
    l'admin (cf. IsAuthenticatedReadOnlyOrAdminWrite).
    """

    queryset = Alerte.objects.select_related("admin")
    serializer_class = AlerteSerializer
    permission_classes = [IsAuthenticatedReadOnlyOrAdminWrite]
