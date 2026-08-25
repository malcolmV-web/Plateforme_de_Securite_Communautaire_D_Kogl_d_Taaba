from rest_framework import serializers

from apps.accounts.models import User

from .models import Signalement


class SignalementSerializer(serializers.ModelSerializer):
    """
    Correctifs de securite (audit backend Laravel) :
    - `user` est en lecture seule et force au user authentifie a la creation
      (plus de `Signalement::create($request->all())` acceptant un user_id
      arbitraire).
    - `statut` n'est modifiable que par un agent/admin (un citoyen ne peut
      pas se cloturer/valider lui-meme son propre signalement).
    - Champs explicitement declares : plus de mass assignment, chaque champ
      accepte est valide (type/titre/description/lieu obligatoires).
    - Sur une modification, un agent ne peut ecrire QUE `statut` : les autres
      champs (titre, description, lieu, type, photo) sont verrouilles en
      lecture seule pour lui, seul l'auteur (ou un admin) peut les editer.
    """

    user = serializers.PrimaryKeyRelatedField(read_only=True)
    auteur = serializers.CharField(source="user.get_full_name", read_only=True)

    class Meta:
        model = Signalement
        fields = [
            "id", "user", "auteur", "type", "titre", "description",
            "lieu", "photo", "statut", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        request = self.context.get("request")
        is_update = self.instance is not None
        if request and is_update and getattr(request.user, "role", None) == User.Role.AGENT:
            locked_fields = set(self.fields) - {"statut", "id", "user", "auteur", "created_at", "updated_at"}
            for field_name in locked_fields:
                self.fields[field_name].read_only = True

    def validate_statut(self, value):
        request = self.context["request"]
        if request.user.role == User.Role.CITOYEN:
            raise serializers.ValidationError(
                "Seul un agent ou un administrateur peut changer le statut d'un signalement."
            )
        return value

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
