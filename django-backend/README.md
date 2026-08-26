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

## État actuel (étape 2/N)

- Squelette du projet (`config/`) + six apps : `accounts`, `signalements`,
  `alertes`, `conseils`, `messages_app`, `points_accueil`.
- Modèle `User` personnalisé (email comme identifiant, rôle
  `citoyen`/`agent`/`admin`, ville).
- Auth JWT complète : `register`, `login`, `refresh`, `logout`
  (blacklist du refresh token), `me`.
- Gestion des utilisateurs par un admin (`/api/users/`), seule voie pour
  changer le rôle d'un compte.
- Ressource `Signalement` complète (CRUD), avec upload de photo
  (nouveauté par rapport à Laravel).
- Ressource `Alerte` : lecture ouverte à tout utilisateur connecté,
  écriture réservée à l'admin (voir correctif ci-dessous — le
  `AlerteController` Laravel était cassé *et* trop restrictif en lecture).
- Ressource `Conseil` : lecture publique (sans authentification), écriture
  admin — reprend le comportement Laravel.
- Ressource `PointAccueil` : même schéma que `Conseil` (lecture publique,
  écriture admin).
- Ressource `Message` : reconstruite avec de vraies relations `citoyen`
  (fil de conversation) et `emetteur` (qui a écrit) au lieu du champ texte
  libre `auteur` + `citoyen_id` non contraint côté Laravel ; un citoyen ne
  voit/écrit que dans sa propre conversation, un agent peut répondre à
  n'importe quel citoyen en le précisant explicitement.

Reste à porter : rien côté ressources métier — la suite est le branchement
du frontend et le chantier PWA (voir « Prochaines étapes »).

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
| 1 | `AlerteController` cassé (mauvaise classe) — et route API entièrement `role:admin` y compris en lecture, ce qui empêchait aussi les citoyens de consulter les alertes une fois corrigé | Ressource reconstruite ; lecture ouverte à tout utilisateur connecté, écriture (publication) réservée à l'admin |
| 2 | `role` accepté du client à l'inscription | `RegisterSerializer` force `role=citoyen`, ignore tout `role` envoyé ; seul `/api/users/` (admin) peut changer un rôle |
| 3 | Mass assignment (`$request->all()`), pas de vérif de propriété | Serializers DRF à champs explicites ; `user`/`emetteur`/`admin` toujours forcés au user authentifié ; queryset filtré par rôle (`IsOwnerOrAgent` sur Signalement, filtrage par `citoyen` sur Message) — un citoyen ne voit/modifie que ses propres signalements et messages |
| — | Password re-stocké en clair sur update | `set_password()` systématique dans les serializers admin |
| — | `Message.citoyen_id` non contraint, `auteur` en texte libre dupliqué | Vraies FK `citoyen`/`emetteur` vers `User`, nom affiché dérivé via `get_full_name()` |

Testé manuellement (register avec injection de `role`, IDOR entre deux
citoyens sur Signalement et sur Message, verrouillage des champs pour un
agent sauf `statut`, promotion de rôle réservée à l'admin, lecture publique
de Conseil/PointAccueil vs lecture Alerte réservée aux connectés, écriture
partout réservée à l'admin) — voir l'historique de session pour le détail
des appels curl.

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

- Brancher le frontend React sur cette nouvelle API (remplacer les appels
  `axios` codés en dur vers Laravel).
- Rendre le frontend installable en **PWA** (manifest + service worker) pour
  l'usage en mobilité sur le terrain — chantier frontend séparé, à traiter
  une fois l'API Django validée.
- **Garde-fous sur les actions admin sensibles** (`/api/users/{id}/`) : un
  admin peut aujourd'hui réinitialiser le mot de passe ou modifier les
  informations personnelles de n'importe quel compte, sans trace ni
  notification. Nécessaire pour un usage en production, pas bloquant pour
  la suite du développement :
  - journaliser ces actions (qui, quand, quel champ modifié) — par ex. via
    `django-simple-history` ou un modèle `AuditLog` dedie ;
  - notifier l'utilisateur concerné quand son mot de passe ou ses
    informations sont modifiés par un admin (nécessite d'abord un backend
    d'envoi d'email/SMS, absent pour l'instant) ;
  - envisager un vrai flux "mot de passe oublié" self-service pour réduire
    le besoin de reinitialisation manuelle par l'admin.
