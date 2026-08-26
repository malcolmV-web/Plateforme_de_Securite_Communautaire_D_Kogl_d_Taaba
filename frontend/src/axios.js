// Client HTTP centralise vers l'API Django (JWT via l'en-tete
// Authorization, plus de cookie de session / CSRF Sanctum).
//
// Toute page qui appelle l'API DOIT passer par cette instance plutot que
// d'importer `axios` directement avec une URL codee en dur : c'etait la
// source du probleme "il faut modifier 15 fichiers pour changer l'URL de
// l'API" releve dans l'audit du backend Laravel.
import axios from "axios";
import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} from "./auth/tokenStorage";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({ baseURL });

// Instance separee, sans intercepteurs, pour l'appel de rafraichissement
// lui-meme (evite une boucle infinie si le refresh echoue avec un 401).
const refreshClient = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise = null;

function redirectToLogin() {
  clearSession();
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    const isAuthEndpoint = config?.url?.includes("/auth/login") || config?.url?.includes("/auth/refresh");

    if (response?.status === 401 && !config._retry && !isAuthEndpoint) {
      config._retry = true;
      const refresh = getRefreshToken();

      if (!refresh) {
        redirectToLogin();
        return Promise.reject(error);
      }

      try {
        // Mutualise les rafraichissements concurrents (plusieurs requetes
        // en 401 en meme temps ne doivent declencher qu'un seul refresh).
        if (!refreshPromise) {
          refreshPromise = refreshClient
            .post("/auth/refresh/", { refresh })
            .finally(() => {
              refreshPromise = null;
            });
        }
        const { data } = await refreshPromise;
        setAccessToken(data.access);
        config.headers.Authorization = `Bearer ${data.access}`;
        return api(config);
      } catch (refreshError) {
        redirectToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
