import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Alertes() {
  const [alertes, setAlertes] = useState([]);
  const [ville, setVille] = useState('');
  const [niveau, setNiveau] = useState('');
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/alertes', { withCredentials: true })
      .then(res => {
        setAlertes(res.data);
        setErreur(null);
      })
      .catch(() => setErreur("Impossible de charger les alertes."));
  }, []);

  const filtrerAlertes = alertes.filter(a => {
    return (!ville || a.ville === ville) && (!niveau || a.niveau === niveau);
  });

  const couleurs = {
    info: 'primary',
    alerte: 'warning',
    urgence: 'danger'
  };

  const villesUniques = [...new Set(alertes.map(a => a.ville).filter(v => v))];

  return (
    <div className="container py-4">
      <h2 className="mb-4">Alertes Locales</h2>

      {erreur && <div className="alert alert-danger">{erreur}</div>}

      <div className="row mb-3">
        <div className="col-md-6">
          <select className="form-select" value={ville} onChange={e => setVille(e.target.value)}>
            <option value="">Filtrer par ville</option>
            {villesUniques.map((v, idx) => (
              <option key={idx} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <select className="form-select" value={niveau} onChange={e => setNiveau(e.target.value)}>
            <option value="">Filtrer par niveau</option>
            <option value="info">Info</option>
            <option value="alerte">Alerte</option>
            <option value="urgence">Urgence</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filtrerAlertes.length > 0 ? (
          filtrerAlertes.map(a => (
            <div className="col-md-4 mb-3" key={a.id}>
              <div className={`card border-${couleurs[a.niveau] || 'secondary'}`}>
                <div className={`card-header bg-${couleurs[a.niveau] || 'secondary'} text-white`}>
                  {a.niveau?.toUpperCase() || 'NIVEAU'}
                </div>
                <div className="card-body">
                  <h5 className="card-title">{a.ville}</h5>
                  <p className="card-text">{a.message?.slice(0, 60)}...</p>
                  <Link to={`/alertes/${a.id}`} className="btn btn-sm btn-outline-primary">Voir détails</Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune alerte trouvée avec ces critères.</p>
        )}
      </div>
    </div>
  );
}
