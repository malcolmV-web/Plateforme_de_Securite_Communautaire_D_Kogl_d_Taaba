import { useEffect, useState } from "react";
import api from "../../axios";

export default function ProfilAdmin() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [alertes, setAlertes] = useState([]);
  const [points, setPoints] = useState([]);

  const [alerteForm, setAlerteForm] = useState({ ville: "", niveau: "info", message: "" });
  const [promotionUserId, setPromotionUserId] = useState("");
  const [pointForm, setPointForm] = useState({ nom: "", type: "Police", ville: "", contact: "" });

  useEffect(() => {
    api.get("/users/")
      .then(res => setUtilisateurs(res.data))
      .catch(err => console.error("Erreur chargement utilisateurs", err));

    api.get("/alertes/")
      .then(res => setAlertes(res.data))
      .catch(err => console.error("Erreur chargement alertes", err));

    api.get("/points-accueil/")
      .then(res => setPoints(res.data))
      .catch(err => console.error("Erreur chargement points d’accueil", err));
  }, []);

  const supprimerAlerte = async (id) => {
    try {
      await api.delete(`/alertes/${id}/`);
      setAlertes(alertes.filter(a => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Échec de la suppression de l'alerte");
    }
  };

  const ajouterAlerte = async (e) => {
    e.preventDefault();
    try {
      // `admin` est force au user authentifie cote serveur, pas besoin de
      // l'envoyer (l'ancienne version codait un admin_id=3 en dur).
      const nouvelleAlerte = {
        ...alerteForm,
        date_publication: new Date().toISOString(),
      };
      const res = await api.post("/alertes/", nouvelleAlerte);
      setAlertes([res.data, ...alertes]);
      setAlerteForm({ ville: "", niveau: "info", message: "" });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création de l’alerte");
    }
  };

  const promouvoirUtilisateur = async () => {
    const utilisateur = utilisateurs.find(u => u.id === parseInt(promotionUserId));
    if (!utilisateur || utilisateur.role !== "citoyen") return;

    try {
      // PATCH partiel : on ne touche qu'au role, pas besoin de renvoyer
      // tout l'objet utilisateur.
      const res = await api.patch(`/users/${promotionUserId}/`, { role: "agent" });
      setUtilisateurs(utilisateurs.map(u => u.id === res.data.id ? res.data : u));
      setPromotionUserId("");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la promotion");
    }
  };

  const ajouterPointAccueil = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/points-accueil/", pointForm);
      setPoints([...points, res.data]);
      setPointForm({ nom: "", type: "Police", ville: "", contact: "" });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’ajout du point d’accueil");
    }
  };

  return (
    <div className="container py-5">
      <h2>Tableau de bord Administrateur</h2>
      <hr />

      {/* Formulaire Alerte */}
      <section className="mb-4">
        <h5>Nouvelle Alerte</h5>
        <form onSubmit={ajouterAlerte} className="row g-2 mb-3">
          <div className="col-md-4">
            <input className="form-control" placeholder="Ville" required
              value={alerteForm.ville} onChange={e => setAlerteForm({ ...alerteForm, ville: e.target.value })} />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={alerteForm.niveau}
              onChange={e => setAlerteForm({ ...alerteForm, niveau: e.target.value })}>
              <option value="info">Info</option>
              <option value="alerte">Alerte</option>
              <option value="urgence">Urgence</option>
            </select>
          </div>
          <div className="col-md-5">
            <input className="form-control" placeholder="Message" required
              value={alerteForm.message} onChange={e => setAlerteForm({ ...alerteForm, message: e.target.value })} />
          </div>
          <div className="col-md-12">
            <button className="btn btn-success">Publier</button>
          </div>
        </form>
      </section>

      {/* Alertes existantes */}
      <section className="mb-5">
        <h4>Alertes existantes</h4>
        {alertes.length === 0 ? <p>Aucune alerte.</p> : (
          <ul className="list-group">
            {alertes.map(alerte => (
              <li key={alerte.id} className="list-group-item d-flex justify-content-between">
                <div>
                  <strong>{alerte.niveau.toUpperCase()}</strong> - {alerte.message}<br />
                  <small className="text-muted">{alerte.ville} – {new Date(alerte.date_publication).toLocaleDateString()}</small>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => supprimerAlerte(alerte.id)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Promotion citoyen */}
      <section className="mb-4">
        <h5>Promouvoir un Citoyen</h5>
        <div className="d-flex mb-3">
          <select className="form-select me-2" value={promotionUserId}
            onChange={(e) => setPromotionUserId(e.target.value)}>
            <option value="">-- Sélectionner un citoyen --</option>
            {utilisateurs.filter(u => u.role === "citoyen").map(u => (
              <option key={u.id} value={u.id}>{u.first_name} ({u.email})</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={promouvoirUtilisateur}>Promouvoir</button>
        </div>
      </section>

      {/* Liste utilisateurs */}
      <section className="mb-5">
        <h4>Utilisateurs</h4>
        <table className="table table-bordered">
          <thead>
            <tr><th>Nom</th><th>Email</th><th>Ville</th><th>Rôle</th></tr>
          </thead>
          <tbody>
            {utilisateurs.map(u => (
              <tr key={u.id}>
                <td>{u.first_name}</td>
                <td>{u.email}</td>
                <td>{u.ville}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Formulaire point d'accueil */}
      <section className="mb-4">
        <h5>Ajouter un Point d’accueil</h5>
        <form onSubmit={ajouterPointAccueil} className="row g-2">
          <div className="col-md-3">
            <input className="form-control" placeholder="Nom" required
              value={pointForm.nom} onChange={e => setPointForm({ ...pointForm, nom: e.target.value })} />
          </div>
          <div className="col-md-3">
            <select className="form-select" value={pointForm.type}
              onChange={e => setPointForm({ ...pointForm, type: e.target.value })}>
              <option>Police</option>
              <option>Gendarmerie</option>
              <option>Pompiers</option>
            </select>
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Ville" required
              value={pointForm.ville} onChange={e => setPointForm({ ...pointForm, ville: e.target.value })} />
          </div>
          <div className="col-md-3">
            <input className="form-control" placeholder="Contact" required
              value={pointForm.contact} onChange={e => setPointForm({ ...pointForm, contact: e.target.value })} />
          </div>
          <div className="col-md-12">
            <button className="btn btn-success">Ajouter</button>
          </div>
        </form>
      </section>

      {/* Liste des points */}
      <section>
        <h4>Points d’accueil enregistrés</h4>
        {points.length === 0 ? <p>Aucun point d’accueil.</p> : (
          <ul className="list-group">
            {points.map(pt => (
              <li key={pt.id} className="list-group-item">
                <strong>{pt.type}</strong> – {pt.nom} ({pt.ville})<br />
                <small>Contact : {pt.contact}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
