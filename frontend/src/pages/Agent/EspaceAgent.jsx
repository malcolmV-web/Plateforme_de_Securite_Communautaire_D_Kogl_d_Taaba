/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function EspaceAgent() {
  const [messages, setMessages] = useState([]);
  const [groupedMessages, setGroupedMessages] = useState({});
  const [signalements, setSignalements] = useState([]);
  const [utilisateur, setUtilisateur] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("utilisateur"));
    if (!userData || userData.role !== "agent") {
      alert("Accès non autorisé.");
      navigate("/login");
      return;
    }

    setUtilisateur(userData);

    // Récupération des messages
    axios
      .get("http://localhost:8000/api/messages", { withCredentials: true })
      .then((res) => {
        const grouped = res.data.reduce((acc, msg) => {
          const citoyenId = msg.citoyen_id || "inconnu";
          if (!acc[citoyenId]) acc[citoyenId] = [];
          acc[citoyenId].push(msg);
          return acc;
        }, {});
        setGroupedMessages(grouped);
      })
      .catch((err) => console.error("Erreur chargement messages :", err));

    // Récupération des signalements
    axios
      .get("http://localhost:8000/api/signalements", { withCredentials: true })
      .then((res) => setSignalements(res.data))
      .catch((err) => console.error("Erreur chargement signalements :", err));
  }, [navigate]);

  return (
    <div className="container py-4">
      <h2>Espace Agent</h2>
      <hr />
      <p>
        Bienvenue, <strong>{utilisateur?.nom ?? "..."}</strong>
      </p>

      {/* MESSAGES GROUPE PAR CITOYEN */}
      <section className="mb-5">
        <h4>Messages reçus</h4>
        {Object.entries(groupedMessages).length === 0 ? (
          <p>Aucun message pour le moment.</p>
        ) : (
          Object.entries(groupedMessages).map(([citoyenId, msgs]) => (
            <div key={citoyenId} className="mb-4">
              <h6 className="text-primary">Citoyen #{citoyenId}</h6>
              {msgs
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((msg) => (
                  <div key={msg.id} className="border rounded p-2 mb-1">
                    <p>
                      <strong>{msg.auteur}</strong> : {msg.contenu}
                    </p>
                    <small className="text-muted">
                      {new Date(msg.date).toLocaleString()}
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
              .sort((a, b) => b.id - a.id)
              .map((s) => (
                <li key={s.id} className="list-group-item">
                  <strong>{s.titre}</strong> - <span>{s.type}</span>
                  <br />
                  <small>{s.localisation}</small>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
