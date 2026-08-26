import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios";

export default function ConseilDetail() {
  const { id } = useParams();
  const [conseil, setConseil] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    setChargement(true);
    api
      .get(`/conseils/${id}/`)
      .then((res) => {
        setConseil(res.data);
        setErreur(null);
      })
      .catch((err) => {
        console.error("Erreur de chargement du conseil", err);
        setErreur("Le conseil demandé est introuvable ou une erreur s’est produite.");
      })
      .finally(() => {
        setChargement(false);
      });
  }, [id]);

  if (chargement) return <div className="container py-4">Chargement...</div>;

  if (erreur)
    return (
      <div className="container py-4">
        <div className="alert alert-danger">{erreur}</div>
      </div>
    );

  return (
    <div className="container py-4">
      <h2 className="mb-3">{conseil.titre}</h2>
      <ul className="list-unstyled text-muted mb-3">
        <li><strong>Catégorie :</strong> {conseil.categorie}</li>
        <li><strong>Thème :</strong> {conseil.theme}</li>
        <li><strong>Date de publication :</strong> {new Date(conseil.date_publication).toLocaleDateString("fr-FR")}</li>
      </ul>
      <hr />
      <div style={{ whiteSpace: "pre-line" }}>{conseil.contenu}</div>
    </div>
  );
}
