/* eslint-disable no-unused-vars */
import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import axios from 'axios';

export default function Demarches() {
  const [formData, setFormData] = useState({
    type: '',
    titre: '',
    description: '',
    localisation: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    try {
      // Obtenir le cookie CSRF (Sanctum)
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true
      });

      // Envoyer le signalement
      await axios.post("http://localhost:8000/api/signalements", formData, {
        withCredentials: true
      });

      setMessage({ type: 'success', text: 'Signalement envoyé avec succès.' });
      setFormData({ type: '', titre: '', description: '', localisation: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Erreur lors de l’envoi du signalement.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container py-4">
        <h2 className="mb-4">Démarches en ligne – Signalement</h2>

        {message.text && (
          <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`} role="alert">
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">Type d’incident</label>
            <select
              id="type"
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner --</option>
              <option value="vol">Vol</option>
              <option value="agression">Agression</option>
              <option value="cybermenace">Cybermenace</option>
              <option value="arnaque">Arnaque</option>
              <option value="abus">Abus d'autorité</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="titre" className="form-label">Titre</label>
            <input
              type="text"
              id="titre"
              className="form-control"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              placeholder="Ex : Vol de sac au marché"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              className="form-control"
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez l’incident..."
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="localisation" className="form-label">Localisation (ville ou lieu)</label>
            <input
              type="text"
              id="localisation"
              className="form-control"
              name="localisation"
              value={formData.localisation}
              onChange={handleChange}
              placeholder="Ex : Ouagadougou"
              required
            />
          </div>

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Envoi en cours...' : 'Envoyer le signalement'}
          </button>
        </form>
      </div>
    </div>
  );
}
