import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

export default function SignalementAccueil() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="container py-4">
        <h2 className="mb-4">Signalement d’incidents</h2>
        <p className="mb-4">
          Choisissez une des options ci-dessous pour signaler un incident ou obtenir de l’aide.
        </p>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-geo-alt-fill text-primary" style={{ fontSize: "2rem" }}></i>
                <h5 className="card-title mt-3">Trouver un point d’accueil</h5>
                <p className="card-text">
                  Consultez les commissariats, gendarmeries et casernes disponibles par ville.
                </p>
                <Link
                  to="/signalement/points"
                  className="btn btn-outline-primary btn-sm"
                  aria-label="Trouver un point d’accueil"
                >
                  Accéder
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-pencil-square text-success" style={{ fontSize: "2rem" }}></i>
                <h5 className="card-title mt-3">Démarches en ligne</h5>
                <p className="card-text">
                  Signalez un vol, une agression, une cyberattaque, etc., en remplissant un formulaire.
                </p>
                <Link
                  to="/signalement/demarches"
                  className="btn btn-outline-success btn-sm"
                  aria-label="Remplir une démarche en ligne"
                >
                  Commencer
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <i className="bi bi-chat-dots text-info" style={{ fontSize: "2rem" }}></i>
                <h5 className="card-title mt-3">Chat avec un agent</h5>
                <p className="card-text">
                  Posez vos questions à un agent disponible via notre messagerie instantanée.
                </p>
                <Link
                  to="/signalement/chat"
                  className="btn btn-outline-info btn-sm"
                  aria-label="Lancer le chat"
                >
                  Lancer le chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
