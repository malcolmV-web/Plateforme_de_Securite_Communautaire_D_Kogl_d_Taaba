import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatAgent() {
  const [messages, setMessages] = useState([]);
  const [reponse, setReponse] = useState("");
  const [citoyens, setCitoyens] = useState([]);
  const [citoyenActif, setCitoyenActif] = useState("");

  // Charger tous les messages et citoyens
  useEffect(() => {
    axios.get("http://localhost:8000/api/messages", { withCredentials: true })
      .then((res) => setMessages(res.data))
      .catch((err) => console.error("Erreur chargement messages :", err));

    axios.get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        const liste = res.data.filter((u) => u.role === "citoyen");
        setCitoyens(liste);
      })
      .catch((err) => console.error("Erreur chargement utilisateurs :", err));
  }, []);

  // Filtrer les messages selon le citoyen actif
  const messagesFiltres = messages.filter(
    (m) => String(m.citoyen_id) === String(citoyenActif)
  );

  const handleSend = async () => {
    if (!reponse.trim() || !citoyenActif) return;

    const nouveauMessage = {
      auteur: "Agent",
      contenu: reponse.trim(),
      citoyen_id: citoyenActif,
      date: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:8000/api/messages", nouveauMessage, {
        withCredentials: true,
      });

      setMessages([...messages, nouveauMessage]);
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
              {c.nom} ({c.email})
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
              messagesFiltres.map((m, i) => (
                <div
                  key={i}
                  className={`mb-2 ${
                    m.auteur === "Agent" ? "text-end" : "text-start"
                  }`}
                >
                  <small className="text-muted d-block">{m.auteur} - {new Date(m.date).toLocaleString()}</small>
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
