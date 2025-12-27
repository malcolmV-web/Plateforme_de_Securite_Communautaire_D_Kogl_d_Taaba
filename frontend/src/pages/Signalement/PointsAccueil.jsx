import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Sidebar';

export default function PointsAccueil() {
  const [points, setPoints] = useState([]);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/points-accueil', {
      withCredentials: true
    })
      .then(res => {
        setPoints(res.data);
        setErreur(null);
      })
      .catch(err => {
        console.error('Erreur chargement points :', err);
        setErreur("Impossible de charger les points d’accueil.");
      });
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container py-4">
        <h2 className="mb-4">Points d’accueil disponibles</h2>

        {erreur && <div className="alert alert-danger">{erreur}</div>}

        {points.length === 0 && !erreur && (
          <p>Aucun point d’accueil trouvé pour le moment.</p>
        )}

        <div className="row">
          {points.map(point => (
            <div key={point.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card border-secondary h-100">
                <div className="card-header text-white bg-dark">
                  {point.type || "Point d'accueil"}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{point.nom}</h5>
                  <p className="card-text">
                    <strong>Ville :</strong> {point.ville}<br />
                    <strong>Contact :</strong> {point.contact}<br />
                    {point.adresse && (<><strong>Adresse :</strong> {point.adresse}<br /></>)}
                  </p>

                  {/* Bouton carte, à connecter à une fonctionnalité de géolocalisation */}
                  {point.latitude && point.longitude ? (
                    <a
                      href={`https://www.google.com/maps?q=${point.latitude},${point.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Voir sur la carte
                    </a>
                  ) : (
                    <button className="btn btn-outline-secondary btn-sm" disabled>
                      Coordonnées indisponibles
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
