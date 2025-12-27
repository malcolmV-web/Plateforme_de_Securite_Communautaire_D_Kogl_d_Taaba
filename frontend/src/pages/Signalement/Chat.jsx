import { useEffect, useState, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [nouveauMessage, setNouveauMessage] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [pseudo, setPseudo] = useState('Citoyen'); // À remplacer par l'utilisateur connecté
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Charger les messages au montage
  useEffect(() => {
    axios.get('http://localhost:8000/api/messages', {
      withCredentials: true
    })
    .then(res => setMessages(res.data))
    .catch(() => alert("Erreur lors du chargement des messages."))
    .finally(() => setLoading(false));
  }, []);

  // Scroller vers le bas automatiquement
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!nouveauMessage.trim()) return;

    const nouveau = {
      auteur: pseudo,
      contenu: nouveauMessage,
    };

    try {
      // Assurer que le cookie CSRF est récupéré
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true
      });

      const res = await axios.post("http://localhost:8000/api/messages", nouveau, {
        withCredentials: true
      });

      setMessages(prev => [...prev, res.data]);
      setNouveauMessage('');
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l’envoi du message.");
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container py-4">
        <h2 className="mb-3">Messagerie – Chat avec un agent</h2>

        <div className="border rounded p-3 mb-3 bg-white" style={{ height: '300px', overflowY: 'auto' }}>
          {loading ? (
            <p>Chargement des messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-muted">Aucun message pour l’instant.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`mb-2 ${msg.auteur === 'Citoyen' ? 'text-start' : 'text-end'}`}>
                <small className="text-muted">{msg.auteur}</small>
                <div className="bg-light p-2 rounded d-inline-block">{msg.contenu}</div>
              </div>
            ))
          )}
          <div ref={scrollRef} />
        </div>

        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Écrivez votre message…"
            value={nouveauMessage}
            onChange={(e) => setNouveauMessage(e.target.value)}
          />
          <button onClick={handleSend} className="btn btn-primary">Envoyer</button>
        </div>
      </div>
    </div>
  );
}
