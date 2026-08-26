import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../axios";
import { useAuth } from "../../context/AuthContext";

export default function ChatAgent() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [reponse, setReponse] = useState("");
  const [citoyenActif, setCitoyenActif] = useState(searchParams.get("citoyen_id") || "");

  // L'agent voit toutes les conversations : /api/messages/ suffit, pas
  // besoin de /api/users/ (reserve aux admins) pour lister les citoyens —
  // on les deduit des messages eux-memes (citoyen + citoyen_nom).
  useEffect(() => {
    api.get("/messages/")
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Erreur chargement messages :", err));
  }, []);

  const citoyens = useMemo(() => {
    const parId = new Map();
    messages.forEach((m) => {
      if (!parId.has(m.citoyen)) {
        parId.set(m.citoyen, { id: m.citoyen, nom: m.citoyen_nom });
      }
    });
    return Array.from(parId.values());
  }, [messages]);

  const messagesFiltres = messages.filter(
    (m) => String(m.citoyen) === String(citoyenActif)
  );

  const handleSend = async () => {
    if (!reponse.trim() || !citoyenActif) return;

    try {
      const res = await api.post("/messages/", {
        contenu: reponse.trim(),
        citoyen: citoyenActif,
      });
      setMessages((prev) => [...prev, res.data]);
      setReponse("");
    } catch (err) {
      alert("Erreur lors de l'envoi du message.");
      console.error(err);
    }
  };

  return (
    <div className="container py-4">
      <h3>Messagerie – Répondre à un citoyen</h3>

      <div className="mb-3">
        <label className="form-label">Choisir un citoyen :</label>
        <select
          className="form-select"
          value={citoyenActif}
          onChange={(e) => setCitoyenActif(e.target.value)}
        >
          <option value="">-- Sélectionner --</option>
          {citoyens.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nom}
            </option>
          ))}
        </select>
      </div>

      {citoyenActif && (
        <>
          <div
            className="border rounded p-3 mb-3"
            style={{ height: "300px", overflowY: "auto" }}
          >
            {messagesFiltres.length === 0 ? (
              <p className="text-muted">Aucun message pour ce citoyen.</p>
            ) : (
              messagesFiltres.map((m) => (
                <div
                  key={m.id}
                  className={`mb-2 ${
                    m.emetteur === user?.id ? "text-end" : "text-start"
                  }`}
                >
                  <small className="text-muted d-block">
                    {m.auteur} - {new Date(m.created_at).toLocaleString()}
                  </small>
                  <div className="bg-light p-2 rounded d-inline-block">
                    {m.contenu}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Votre réponse..."
              value={reponse}
              onChange={(e) => setReponse(e.target.value)}
            />
            <button onClick={handleSend} className="btn btn-primary">
              Envoyer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
