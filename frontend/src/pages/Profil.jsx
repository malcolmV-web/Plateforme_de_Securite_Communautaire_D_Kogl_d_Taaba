// src/pages/Profil.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profil() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.role === "citoyen") {
      navigate("/profil/citoyen");
    } else if (user.role === "agent") {
      navigate("/profil/agent");
    } else if (user.role === "admin") {
      navigate("/profil/admin");
    }
  }, [user, navigate]);

   <p className="text-center py-5">Redirection en cours...</p>;

  return null;
}
