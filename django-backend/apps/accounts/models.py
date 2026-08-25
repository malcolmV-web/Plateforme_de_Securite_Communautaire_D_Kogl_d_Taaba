from django.contrib.auth.models import AbstractUser
from django.db import models

from .managers import UserManager


class User(AbstractUser):
    """
    Utilisateur de la plateforme.

    Reprend les champs du modele Laravel (name/email/password/ville/role)
    mais utilise l'email comme identifiant de connexion. Le champ `username`
    herite d'AbstractUser est desactive.
    """

    class Role(models.TextChoices):
        CITOYEN = "citoyen", "Citoyen"
        AGENT = "agent", "Agent"
        ADMIN = "admin", "Administrateur"

    username = None
    email = models.EmailField("adresse email", unique=True)
    ville = models.CharField("ville", max_length=255)
    role = models.CharField(
        "role",
        max_length=20,
        choices=Role.choices,
        default=Role.CITOYEN,
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "ville"]

    objects = UserManager()

    class Meta:
        verbose_name = "utilisateur"
        verbose_name_plural = "utilisateurs"

    def __str__(self):
        return f"{self.get_full_name() or self.email} ({self.role})"

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN

    @property
    def is_agent(self):
        return self.role == self.Role.AGENT

    @property
    def is_citoyen(self):
        return self.role == self.Role.CITOYEN
