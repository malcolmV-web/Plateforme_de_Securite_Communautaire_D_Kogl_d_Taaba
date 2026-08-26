import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ville, setVille] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");
    try {
      // Pas de champ "role" : l'API le force toujours a "citoyen" cote
      // serveur, quoi qu'on envoie (voir audit backend).
      await api.post("/auth/register/", {
        first_name: name,
        email,
        password,
        ville,
      });

      alert("Inscription réussie !");
      navigate("/login");
    } catch (error) {
      console.error(error);
      const data = error.response?.data;
      const premierMessage = data && Object.values(data)[0]?.[0];
      setErreur(premierMessage || "Erreur lors de l’inscription.");
    }
  };

  return (
    <div className="container">
      <h2>Inscription</h2>
      {erreur && <div className="alert alert-danger">{erreur}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nom :</label>
          <input type="text" className="form-control"
            value={name} onChange={e => setName(e.target.value)} required />
        </div>
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
        <div className="mb-3">
          <label>Ville :</label>
          <input type="text" className="form-control"
            value={ville} onChange={e => setVille(e.target.value)} required />
        </div>
        <button className="btn btn-success">S’inscrire</button>
      </form>
    </div>
  );
}
