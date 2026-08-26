import { useEffect, useState, useRef } from 'react';
import Sidebar from '../../components/Sidebar';
import api from '../../axios';
import { useAuth } from '../../context/AuthContext';

export default function Chat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [nouveauMessage, setNouveauMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Charger les messages au montage (l'API ne renvoie que la conversation
  // du citoyen connecte).
  useEffect(() => {
    api.get('/messages/')
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

    try {
      // citoyen et emetteur sont forces cote serveur au user connecte.
      const res = await api.post('/messages/', { contenu: nouveauMessage });

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
              <div key={msg.id} className={`mb-2 ${msg.emetteur === user?.id ? 'text-end' : 'text-start'}`}>
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
