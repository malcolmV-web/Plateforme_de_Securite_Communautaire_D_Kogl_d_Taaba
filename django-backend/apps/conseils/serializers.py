from rest_framework import serializers

from .models import Conseil


class ConseilSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conseil
        fields = ["id", "categorie", "titre", "theme", "contenu", "date_publication", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
