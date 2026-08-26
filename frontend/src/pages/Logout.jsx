import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../axios";
import { getRefreshToken } from "../auth/tokenStorage";

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Met le refresh token en liste noire cote serveur (il ne pourra
        // plus servir a obtenir un nouvel access token).
        const refresh = getRefreshToken();
        if (refresh) {
          await api.post("/auth/logout/", { refresh });
        }
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
      } finally {
        logout();
        navigate("/login");
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return null;
}
