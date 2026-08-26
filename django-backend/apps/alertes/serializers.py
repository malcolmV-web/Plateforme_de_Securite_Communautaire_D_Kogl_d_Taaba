from rest_framework import serializers

from .models import Alerte


class AlerteSerializer(serializers.ModelSerializer):
    """`admin` est en lecture seule et force a l'utilisateur admin authentifie."""

    admin = serializers.PrimaryKeyRelatedField(read_only=True)
    admin_nom = serializers.CharField(source="admin.get_full_name", read_only=True)

    class Meta:
        model = Alerte
        fields = [
            "id", "message", "ville", "niveau", "admin", "admin_nom",
            "date_publication", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def create(self, validated_data):
        validated_data["admin"] = self.context["request"].user
        return super().create(validated_data)
