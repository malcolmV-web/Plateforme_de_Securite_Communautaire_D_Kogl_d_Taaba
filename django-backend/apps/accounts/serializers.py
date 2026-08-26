from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(serializers.ModelSerializer):
    """Representation d'un utilisateur (jamais le mot de passe)."""

    class Meta:
        model = User
        fields = ["id", "first_name", "email", "ville", "role", "date_joined"]
        read_only_fields = ["id", "date_joined"]


class RegisterSerializer(serializers.ModelSerializer):
    """
    Inscription publique.

    Correctif de securite (audit backend Laravel) : le role N'EST PAS un
    champ accepte ici. Il est force a `citoyen` cote serveur, quoi que le
    client envoie dans la requete. Seul un admin peut changer le role d'un
    utilisateur, via UserAdminViewSet.
    """

    password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ["id", "first_name", "email", "password", "ville"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data.get("first_name", ""),
            ville=validated_data["ville"],
            role=User.Role.CITOYEN,
        )


class AdminUserSerializer(serializers.ModelSerializer):
    """
    Gestion des utilisateurs par un admin (promotion de role, etc.).
    Reserve aux vues protegees par IsAdmin — jamais expose au public.
    """

    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])

    class Meta:
        model = User
        fields = ["id", "first_name", "email", "password", "ville", "role", "is_active", "date_joined"]
        read_only_fields = ["id", "date_joined"]

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class KoglTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Login : ajoute le role/ville dans le payload du token et renvoie les
    infos utilisateur avec les tokens (comme le faisait AuthController::login
    cote Laravel), pour eviter un aller-retour supplementaire sur /me.
    """

    username_field = User.USERNAME_FIELD

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        token["email"] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data
