import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfilAgent() {
  const [messages, setMessages] = useState([]);
  const [reponses, setReponses] = useState({});
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    // Récupération du user depuis localStorage (auth simplifiée)
    const userData = JSON.parse(localStorage.getItem("utilisateur"));
    if (userData?.role !== "agent") {
      alert("Accès réservé aux agents.");
      return;
    }
    setUtilisateur(userData);

    // Chargement des messages depuis API Laravel
    axios
      .get("http://localhost:8000/api/messages", {
        withCredentials: true,
      })
      .then((res) => setMessages(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des messages", err)
      );
  }, []);

  const handleReponseChange = (id, value) => {
    setReponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleEnvoyer = async (id) => {
    const messageTexte = reponses[id]?.trim();
    if (!messageTexte) return;

    const nouvelleReponse = {
      auteur: "Agent",
      contenu: messageTexte,
      date: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:8000/api/messages", nouvelleReponse, {
        withCredentials: true,
      });
      setMessages((prev) => [...prev, nouvelleReponse]);
      setReponses((prev) => ({ ...prev, [id]: "" }));
    } catch (err) {
      console.error("Erreur lors de l'envoi :", err);
      alert("Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="container py-5">
      <h3>Espace Agent - Support</h3>
      <hr />
      <p>
        Connecté en tant que :{" "}
        <strong>{utilisateur?.nom ?? "Inconnu"}</strong>
      </p>

      {messages.length === 0 ? (
        <p className="text-muted">Aucun message reçu pour l’instant.</p>
      ) : (
        messages.map((msg) => (
          <div key={msg.id} className="card mb-3">
            <div className="card-body">
              <p>
                <strong>{msg.auteur}</strong> : {msg.contenu}
              </p>
              <small className="text-muted">
                {new Date(msg.date).toLocaleString()}
              </small>

              <div className="mt-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Votre réponse..."
                  value={reponses[msg.id] || ""}
                  onChange={(e) =>
                    handleReponseChange(msg.id, e.target.value)
                  }
                />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEnvoyer(msg.id)}
                  disabled={!reponses[msg.id]?.trim()}
                >
                  Répondre
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
