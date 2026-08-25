from rest_framework import generics, permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User
from .permissions import IsAdmin
from .serializers import (
    AdminUserSerializer,
    KoglTokenObtainPairSerializer,
    RegisterSerializer,
    UserSerializer,
)


class RegisterView(generics.CreateAPIView):
    """POST /api/auth/register/ — inscription publique, role force a citoyen."""

    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginView(TokenObtainPairView):
    """POST /api/auth/login/ — renvoie access, refresh et l'utilisateur."""

    serializer_class = KoglTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]


class LogoutView(APIView):
    """
    POST /api/auth/logout/ — met le refresh token courant en liste noire.

    Le frontend doit egalement supprimer les tokens qu'il a stockes
    localement ; cote serveur on invalide le refresh pour empecher son
    reutilisation (equivalent de tokens()->delete() sous Sanctum).
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh = request.data.get("refresh")
        if refresh:
            try:
                RefreshToken(refresh).blacklist()
            except Exception:
                pass
        return Response({"message": "Deconnexion reussie."})


class MeView(generics.RetrieveAPIView):
    """GET /api/auth/me/ — profil de l'utilisateur authentifie."""

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class AdminUserViewSet(viewsets.ModelViewSet):
    """
    /api/users/ — CRUD utilisateurs reserve aux admins (role:admin).

    C'est ici, et uniquement ici, que le champ `role` d'un utilisateur peut
    etre modifie (promotion citoyen -> agent, etc.).
    """

    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = AdminUserSerializer
    permission_classes = [IsAdmin]
