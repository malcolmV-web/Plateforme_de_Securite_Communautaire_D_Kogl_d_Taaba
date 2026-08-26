import { useEffect, useState } from "react";
import api from "../../axios";
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

    // L'API ne renvoie deja que les signalements du citoyen connecte
    // (voir SignalementViewSet.get_queryset) : pas besoin de filtrer ici.
    api.get("/signalements/")
      .then(res => setSignalements(res.data))
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
      <p><strong>Nom :</strong> {user.first_name ?? 'Non défini'}</p>
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
              <strong>{sig.titre}</strong>
              <span className="badge bg-secondary ms-2">{sig.statut}</span><br />
              <span>{sig.description}</span><br />
              <small className="text-muted">Lieu : {sig.lieu}</small>
              {sig.photo && (
                <div className="mt-2">
                  <a href={sig.photo} target="_blank" rel="noopener noreferrer">Voir la photo jointe</a>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
