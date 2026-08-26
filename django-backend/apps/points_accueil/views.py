from rest_framework import viewsets

from apps.accounts.permissions import IsPubliclyReadableAdminWritable

from .models import PointAccueil
from .serializers import PointAccueilSerializer


class PointAccueilViewSet(viewsets.ModelViewSet):
    """/api/points-accueil/ — lecture publique, ecriture reservee a l'admin (comme cote Laravel)."""

    queryset = PointAccueil.objects.all()
    serializer_class = PointAccueilSerializer
    permission_classes = [IsPubliclyReadableAdminWritable]
