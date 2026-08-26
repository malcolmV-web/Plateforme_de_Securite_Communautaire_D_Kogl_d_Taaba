from rest_framework import viewsets

from apps.accounts.permissions import IsPubliclyReadableAdminWritable

from .models import Conseil
from .serializers import ConseilSerializer


class ConseilViewSet(viewsets.ModelViewSet):
    """
    /api/conseils/ — reprend le comportement Laravel : lecture publique
    (pas d'authentification requise), ecriture reservee a l'admin.
    """

    queryset = Conseil.objects.all()
    serializer_class = ConseilSerializer
    permission_classes = [IsPubliclyReadableAdminWritable]
