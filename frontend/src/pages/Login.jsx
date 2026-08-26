import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    try {
      // JWT : plus de cookie CSRF a recuperer, un seul appel suffit.
      const res = await api.post("/auth/login/", { email, password });
      const { access, refresh, user } = res.data;

      login({ access, refresh, user });

      if (user.role === "admin") {
        navigate("/profil/admin");
      } else if (user.role === "agent") {
        navigate("/agent/espace");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      setErreur("Identifiants incorrects.");
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
