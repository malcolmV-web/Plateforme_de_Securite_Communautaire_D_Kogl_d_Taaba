from rest_framework import serializers

from apps.accounts.models import User

from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    """
    Correctifs de securite (audit backend Laravel, meme faille que sur
    Signalement) :
    - `emetteur` force au user authentifie, jamais accepte du client.
    - `citoyen` force au user authentifie s'il est citoyen ; un agent doit
      preciser quel citoyen il adresse (`citoyen_id` dans le payload).
    - Le queryset (voir MessageViewSet) filtre deja par conversation pour
      qu'un citoyen ne voie jamais les messages d'un autre citoyen.
    """

    emetteur = serializers.PrimaryKeyRelatedField(read_only=True)
    auteur = serializers.CharField(source="emetteur.get_full_name", read_only=True)
    citoyen = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role=User.Role.CITOYEN),
        required=False,
    )
    # Nom du citoyen proprietaire de la conversation (utile cote agent pour
    # regrouper/afficher les fils de discussion sans avoir a interroger
    # /api/users/, reserve aux admins).
    citoyen_nom = serializers.CharField(source="citoyen.get_full_name", read_only=True)

    class Meta:
        model = Message
        fields = ["id", "citoyen", "citoyen_nom", "emetteur", "auteur", "contenu", "created_at"]
        read_only_fields = ["id", "created_at"]

    def validate(self, attrs):
        request = self.context["request"]
        user = request.user

        if user.role == User.Role.CITOYEN:
            # Un citoyen ne peut ecrire que dans SA propre conversation.
            attrs["citoyen"] = user
        elif user.role == User.Role.AGENT:
            if not attrs.get("citoyen"):
                raise serializers.ValidationError(
                    {"citoyen": "L'agent doit preciser a quel citoyen ce message est adresse."}
                )
        return attrs

    def create(self, validated_data):
        validated_data["emetteur"] = self.context["request"].user
        return super().create(validated_data)
