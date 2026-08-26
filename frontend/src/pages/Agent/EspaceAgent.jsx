import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../axios";
import { useAuth } from "../../context/AuthContext";

export default function EspaceAgent() {
  const { user } = useAuth();
  const [groupedMessages, setGroupedMessages] = useState({});
  const [signalements, setSignalements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Correctif : l'ancienne version lisait la cle localStorage
    // "utilisateur", jamais ecrite par AuthContext (qui utilise "user" via
    // tokenStorage) — l'espace agent etait de fait inaccessible. On passe
    // par useAuth(), source unique de verite pour la session.
    if (!user || user.role !== "agent") {
      alert("Accès non autorisé.");
      navigate("/login");
      return;
    }

    api.get("/messages/")
      .then((res) => {
        const grouped = res.data.reduce((acc, msg) => {
          const citoyenId = msg.citoyen ?? "inconnu";
          if (!acc[citoyenId]) acc[citoyenId] = { nom: msg.citoyen_nom, messages: [] };
          acc[citoyenId].messages.push(msg);
          return acc;
        }, {});
        setGroupedMessages(grouped);
      })
      .catch((err) => console.error("Erreur chargement messages :", err));

    api.get("/signalements/")
      .then((res) => setSignalements(res.data))
      .catch((err) => console.error("Erreur chargement signalements :", err));
  }, [user, navigate]);

  return (
    <div className="container py-4">
      <h2>Espace Agent</h2>
      <hr />
      <p>
        Bienvenue, <strong>{user?.first_name ?? "..."}</strong>
      </p>

      {/* MESSAGES GROUPE PAR CITOYEN */}
      <section className="mb-5">
        <h4>Messages reçus</h4>
        {Object.entries(groupedMessages).length === 0 ? (
          <p>Aucun message pour le moment.</p>
        ) : (
          Object.entries(groupedMessages).map(([citoyenId, { nom, messages: msgs }]) => (
            <div key={citoyenId} className="mb-4">
              <h6 className="text-primary">{nom || `Citoyen #${citoyenId}`}</h6>
              {msgs
                .slice()
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((msg) => (
                  <div key={msg.id} className="border rounded p-2 mb-1">
                    <p>
                      <strong>{msg.auteur}</strong> : {msg.contenu}
                    </p>
                    <small className="text-muted">
                      {new Date(msg.created_at).toLocaleString()}
                    </small>
                  </div>
                ))}
              <Link
                to={`/agent/chat?citoyen_id=${citoyenId}`}
                className="btn btn-sm btn-outline-primary mt-2"
              >
                Répondre
              </Link>
            </div>
          ))
        )}
      </section>

      {/* SIGNALEMENTS RECENTS */}
      <section>
        <h4>Signalements récents</h4>
        {signalements.length === 0 ? (
          <p>Aucun signalement disponible.</p>
        ) : (
          <ul className="list-group">
            {signalements
              .slice()
              .sort((a, b) => b.id - a.id)
              .map((s) => (
                <li key={s.id} className="list-group-item">
                  <strong>{s.titre}</strong> - <span>{s.type}</span>
                  <span className="badge bg-secondary ms-2">{s.statut}</span>
                  <br />
                  <small>{s.lieu}</small>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
