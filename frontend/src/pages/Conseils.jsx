import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";

export default function Conseils() {
  const [conseils, setConseils] = useState([]);
  const [categorie, setCategorie] = useState("");
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    api
      .get("/conseils/")
      .then((res) => {
        setConseils(res.data);
        setErreur(null); 
      })
      .catch((err) => {
        console.error("Erreur de chargement des conseils", err);
        setErreur("Impossible de charger les conseils. Veuillez réessayer plus tard.");
      });
  }, []);

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    return [...new Set(conseils.map((c) => c.categorie))];
  }, [conseils]);

  // Filtrer selon la catégorie choisie
  const conseilsFiltres = useMemo(() => {
    return categorie
      ? conseils.filter((c) => c.categorie === categorie)
      : conseils;
  }, [categorie, conseils]);

  // Fonction pour tronquer le contenu sans couper les mots
  const tronquerTexte = (texte, maxLongueur = 80) => {
    if (texte.length <= maxLongueur) return texte;
    const indexEspace = texte.lastIndexOf(" ", maxLongueur);
    return texte.slice(0, indexEspace > 0 ? indexEspace : maxLongueur) + "...";
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Conseils de Sécurité</h2>

      {/* Message d'erreur */}
      {erreur && <div className="alert alert-danger">{erreur}</div>}

      {/* Sélecteur de catégories */}
      <div className="row mb-3">
        <div className="col-md-6">
          <select
            className="form-select"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des conseils */}
      <div className="row">
        {conseilsFiltres.length > 0 ? (
          conseilsFiltres.map((c) => (
            <div key={c.id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{c.titre}</h5>
                  <p className="card-text">{tronquerTexte(c.contenu)}</p>
                  <Link
                    to={`/conseils/${c.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Lire plus
                  </Link>
                </div>
                <div className="card-footer text-muted">
                  {c.theme} —{" "}
                  {new Date(c.date_publication).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun conseil trouvé.</p>
        )}
      </div>
    </div>
  );
}
