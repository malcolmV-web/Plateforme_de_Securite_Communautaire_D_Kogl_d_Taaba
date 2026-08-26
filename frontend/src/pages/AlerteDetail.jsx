import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../axios';

export default function AlerteDetail() {
  const { id } = useParams();
  const [alerte, setAlerte] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    setChargement(true);
    api.get(`/alertes/${id}/`)
    .then(res => {
      setAlerte(res.data);
      setErreur(null);
    })
    .catch(() => {
      setErreur("Alerte introuvable ou erreur serveur.");
      setAlerte(null);
    })
    .finally(() => {
      setChargement(false);
    });
  }, [id]);

  const couleurs = {
    info: "primary",
    alerte: "warning",
    urgence: "danger"
  };

  if (chargement) return <div className="container py-4">Chargement...</div>;

  if (erreur) return (
    <div className="container py-4">
      <div className="alert alert-danger">{erreur}</div>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="mb-3">Détail de l'Alerte</h2>
      <div className={`card border-${couleurs[alerte.niveau] || 'secondary'}`}>
        <div className={`card-header bg-${couleurs[alerte.niveau] || 'secondary'} text-white`}>
          {alerte.niveau?.toUpperCase()}
        </div>
        <div className="card-body">
          <h5 className="card-title">{alerte.ville}</h5>
          <p><strong>Date de publication :</strong> {new Date(alerte.date_publication).toLocaleString("fr-FR")}</p>
          <hr />
          <p>{alerte.message}</p>
        </div>
      </div>
    </div>
  );
}
