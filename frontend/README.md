# Frontend — D'Kogl d'Taaba

SPA React (Vite) consommant l'API Django (`../django-backend/`), authentifiée
par JWT.

## Installation locale

```bash
cd frontend
npm install
cp .env.example .env   # adapter VITE_API_URL si l'API tourne ailleurs
npm run dev
```

Le backend Django doit tourner en parallèle (voir `../django-backend/README.md`)
avant de pouvoir se connecter/s'inscrire.

## Authentification

- `src/axios.js` : client HTTP centralisé — **toute** page qui appelle l'API
  doit passer par cette instance (`import api from "../axios"`), jamais par
  un `import axios from "axios"` direct avec une URL codée en dur. Elle
  attache automatiquement le token JWT (`Authorization: Bearer ...`) et
  rafraîchit l'access token via `/api/auth/refresh/` sur un 401, en
  mutualisant les rafraîchissements concurrents.
- `src/auth/tokenStorage.js` : seul module qui touche au `localStorage` pour
  la session (clés `dkogl_access_token`, `dkogl_refresh_token`,
  `dkogl_user`). Corrige le bug historique où deux clés différentes
  (`"user"` vs `"utilisateur"`) coexistaient selon les pages, rendant
  l'espace agent inaccessible.
- `src/context/AuthContext.jsx` : expose `useAuth()` (`user`, `login()`,
  `logout()`) — toute page qui a besoin de savoir qui est connecté doit
  passer par ce hook plutôt que de relire `localStorage` directement.

## Points d'attention si vous ajoutez une page

- Les listes renvoyées par l'API sont des tableaux JSON bruts (pas de
  pagination pour l'instant, voir `django-backend/README.md`).
- Les ressources publiques (`conseils`, `points-accueil`) sont accessibles
  sans authentification ; les autres nécessitent un token valide (géré
  automatiquement par `api` une fois connecté).
- Pour envoyer un fichier (ex: photo de signalement), utiliser `FormData`
  et l'en-tête `Content-Type: multipart/form-data` — voir
  `src/pages/Signalement/Demarches.jsx`.
