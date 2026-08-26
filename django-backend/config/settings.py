"""
Configuration Django du backend de la Plateforme de Securite Communautaire
D'Kogl d'Taaba.

Remplace progressivement le backend Laravel (laravel-backend/), conserve en
parallele le temps de la migration.
"""

from datetime import timedelta
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DEBUG=(bool, False),
)
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("SECRET_KEY", default="dev-insecure-secret-key-change-me")
DEBUG = env.bool("DEBUG", default=False)
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])


# --------------------------------------------------------------------------
# Applications
# --------------------------------------------------------------------------

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Tiers
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    # Applications internes
    "apps.accounts",
    "apps.signalements",
    "apps.alertes",
    "apps.conseils",
    "apps.messages_app",
    "apps.points_accueil",
]

AUTH_USER_MODEL = "accounts.User"

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# --------------------------------------------------------------------------
# Base de donnees
# --------------------------------------------------------------------------
# PostgreSQL. Les images/fichiers uploades (ex: photo de signalement) ne
# sont PAS stockes en base : seul le chemin est persiste dans la colonne
# (ImageField), le binaire vit dans MEDIA_ROOT (puis un stockage objet type
# S3/Cloudinary en production). C'est la pratique standard Django/Postgres.

DATABASES = {
    "default": env.db(
        "DATABASE_URL",
        default="postgres://kogl_user:kogl_password@localhost:5432/kogl_taaba",
    )
}


# --------------------------------------------------------------------------
# Validation des mots de passe
# --------------------------------------------------------------------------

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator", "OPTIONS": {"min_length": 8}},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# --------------------------------------------------------------------------
# Internationalisation
# --------------------------------------------------------------------------

LANGUAGE_CODE = "fr-fr"
TIME_ZONE = "Africa/Ouagadougou"
USE_I18N = True
USE_TZ = True


# --------------------------------------------------------------------------
# Fichiers statiques / medias (photos de signalement, etc.)
# --------------------------------------------------------------------------

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# --------------------------------------------------------------------------
# Django REST Framework / JWT
# --------------------------------------------------------------------------
# Auth par JWT (Authorization: Bearer <token>) plutot que par cookie de
# session : pas de dependance aux cookies cross-site, ce qui convient a une
# PWA installee utilisee en mobilite (reseau intermittent, potentiellement
# un autre "origin" que le navigateur classique).

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    # Pas de pagination pour l'instant : le frontend (comme le backend
    # Laravel avant lui) attend un tableau JSON brut sur les listes
    # (`Model::all()` cote Laravel). A reactiver plus tard avec une
    # adaptation coordonnee du frontend (lecture de `results`) si le volume
    # de donnees le justifie.
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=env.int("ACCESS_TOKEN_LIFETIME_MIN", default=30)),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=env.int("REFRESH_TOKEN_LIFETIME_DAYS", default=7)),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}


# --------------------------------------------------------------------------
# CORS
# --------------------------------------------------------------------------

CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS",
    default=["http://localhost:5173", "http://127.0.0.1:5173"],
)
# Pas de cookies transmis (auth par JWT dans l'en-tete Authorization) :
# CORS_ALLOW_CREDENTIALS reste a False (defaut).
