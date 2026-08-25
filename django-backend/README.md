# Backend Django — D'Kogl d'Taaba

Nouveau backend, destiné à remplacer progressivement `laravel-backend/`
(conservé en parallèle jusqu'à validation complète de la migration).

## Pourquoi cette migration

- Passage à Django + Django REST Framework.
- Authentification par **JWT** (SimpleJWT) plutôt que par cookie de session
  Sanctum : plus adapté à une PWA installée utilisée en mobilité (réseau
  intermittent, contexte potentiellement hors navigateur classique).
- L'occasion de corriger les failles relevées dans l'audit du backend
  Laravel (élévation de privilège au register, mass assignment, IDOR sur
  les signalements, contrôleur `AlerteController` cassé, etc.) — voir
  « Correctifs de sécurité » plus bas.

## État actuel (étape 1/N)

Portée de cette première passe, avant de porter le reste des ressources
(alertes, conseils, messages, points d'accueil) :

- Squelette du projet (`config/`) + deux apps : `accounts` et `signalements`.
- Modèle `User` personnalisé (email comme identifiant, rôle
  `citoyen`/`agent`/`admin`, ville).
- Auth JWT complète : `register`, `login`, `refresh`, `logout`
  (blacklist du refresh token), `me`.
- Gestion des utilisateurs par un admin (`/api/users/`), seule voie pour
  changer le rôle d'un compte.
- Ressource `Signalement` complète (CRUD), avec upload de photo
  (nouveauté par rapport à Laravel).

Les autres ressources (Alerte, Conseil, Message, PointAccueil) seront
portées dans une passe suivante, une fois ce socle validé.

## Stockage des images

PostgreSQL comme base de données ; les fichiers uploadés (ex: photo de
signalement) **ne sont pas stockés en base**. Seul le chemin est persisté
via `ImageField`, le fichier physique vit dans `MEDIA_ROOT` en
développement. En production, il suffira de configurer un backend de
stockage objet (S3, Cloudinary, etc.) via `DEFAULT_FILE_STORAGE` — aucun
changement de modèle nécessaire.

## Correctifs de sécurité par rapport au backend Laravel

| # audit | Problème Laravel | Correctif Django |
|---|---|---|
| 1 | `AlerteController` cassé (mauvaise classe) | Sera reconstruit proprement lors du portage de la ressource Alerte |
| 2 | `role` accepté du client à l'inscription | `RegisterSerializer` force `role=citoyen`, ignore tout `role` envoyé ; seul `/api/users/` (admin) peut changer un rôle |
| 3 | Mass assignment (`$request->all()`), pas de vérif de propriété | Serializers DRF à champs explicites ; `user` toujours forcé au user authentifié ; queryset filtré par rôle (`IsOwnerOrAgent`) — un citoyen ne voit/modifie que ses propres signalements |
| — | Password re-stocké en clair sur update | `set_password()` systématique dans les serializers admin |

Testé manuellement (register avec injection de `role`, IDOR entre deux
citoyens, verrouillage des champs pour un agent sauf `statut`, promotion de
rôle réservée à l'admin) — voir l'historique de session pour le détail des
appels curl.

## Installation locale

```bash
cd django-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # adapter DATABASE_URL notamment
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Prochaines étapes (hors de cette passe)

- Porter Alerte, Conseil, Message, PointAccueil sur le même modèle
  (serializers explicites + permissions par rôle).
- Brancher le frontend React sur cette nouvelle API (remplacer les appels
  `axios` codés en dur vers Laravel).
- Rendre le frontend installable en **PWA** (manifest + service worker) pour
  l'usage en mobilité sur le terrain — chantier frontend séparé, à traiter
  une fois l'API Django validée.
