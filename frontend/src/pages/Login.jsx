import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../axios"; // utilise l'instance Axios configurée avec Sanctum

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Récupère le cookie CSRF
      await api.get("/sanctum/csrf-cookie");

      // Envoie les données de connexion
      const res = await api.post("/api/login", {
        email: email,
        password: password,
      });

      const utilisateur = res.data.user;

      //  Si l'utilisateur existe, on le connecte
      if (utilisateur) {
        login(utilisateur);

        //  Redirection selon rôle
        if (utilisateur.role === "admin") {
          navigate("/profil/admin");
        } else if (utilisateur.role === "agent") {
          navigate("/agent/espace");
        } else {
          navigate("/home");
        }
      } else {
        setErreur("Identifiants incorrects.");
      }
    } catch (error) {
      console.error(error);
      setErreur("Erreur lors de la connexion.");
    }
  };

  return (
    <div className="container">
      <h2>Connexion</h2>
      {erreur && <div className="alert alert-danger">{erreur}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email :</label>
          <input type="email" className="form-control"
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Mot de passe :</label>
          <input type="password" className="form-control"
            value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Se connecter</button>
      </form>
    </div>
  );
}
