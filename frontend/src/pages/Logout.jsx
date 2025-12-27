import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../axios"; 

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await api.post("/api/logout"); 
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
