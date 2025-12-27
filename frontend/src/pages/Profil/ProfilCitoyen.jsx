import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProfilCitoyen() {
  const { user } = useAuth();
  const [signalements, setSignalements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    axios.get("http://localhost:8000/api/signalements", {
      withCredentials: true,
    })
      .then(res => {
        // Vérifie selon le format retourné par l’API
        const signalementsUser = res.data.filter(sig =>
          sig.user_id === user.id || sig.utilisateurId === user.id || sig.utilisateur?.id === user.id
        );
        setSignalements(signalementsUser);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des signalements :", err);
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (!user) return <p className="container py-4">Chargement du profil...</p>;
  if (loading) return <p className="container py-4">Chargement des signalements...</p>;

  return (
    <div className="container py-5">
      <h3>Mon Profil</h3>
      <hr />
      <p><strong>Nom :</strong> {user.nom ?? 'Non défini'}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Ville :</strong> {user.ville ?? 'Non précisée'}</p>

      <hr />
      <h4>Mes signalements</h4>
      {signalements.length === 0 ? (
        <p className="text-muted">Aucun signalement enregistré.</p>
      ) : (
        <ul className="list-group">
          {signalements.map(sig => (
            <li key={sig.id} className="list-group-item">
              <strong>{sig.titre}</strong><br />
              <span>{sig.description}</span><br />
              <small className="text-muted">Lieu : {sig.localisation}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
