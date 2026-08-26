from rest_framework import serializers

from .models import PointAccueil


class PointAccueilSerializer(serializers.ModelSerializer):
    class Meta:
        model = PointAccueil
        fields = ["id", "nom", "type", "ville", "adresse", "contact", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
