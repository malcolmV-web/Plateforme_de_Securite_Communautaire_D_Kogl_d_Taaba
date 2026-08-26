// Centralise les cles localStorage utilisees pour l'authentification JWT,
// pour eviter les chaines dupliquees entre axios.js et AuthContext.jsx
// (source du bug historique "utilisateur" vs "user" avec l'ancien backend).

const ACCESS_KEY = "dkogl_access_token";
const REFRESH_KEY = "dkogl_refresh_token";
const USER_KEY = "dkogl_user";

export function getAccessToken() {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}

export function getStoredUser() {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setSession({ access, refresh, user }) {
  if (access) localStorage.setItem(ACCESS_KEY, access);
  if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function setAccessToken(access) {
  localStorage.setItem(ACCESS_KEY, access);
}

export function clearSession() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}
