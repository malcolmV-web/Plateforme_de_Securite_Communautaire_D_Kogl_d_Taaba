import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ toggleSidebar }) {
  const { user } = useAuth();

  return (
    <header className="bg-primary text-white">
      {/* Ligne supérieure : logo + bouton + recherche */}
      <div className="container-fluid d-flex justify-content-between align-items-center px-4 py-2 border-bottom">
        <div className="d-flex align-items-center">
          {/* Bouton burger */}
          <button
            className="btn btn-outline-light me-3"
            onClick={toggleSidebar}
            aria-label="Ouvrir le menu latéral"
          >
            ☰
          </button>

          {/* Logo + Nom */}
          <Link className="navbar-brand d-flex align-items-center text-white" to="/">
            <img
              src="/assets/logo.png"
              alt="Logo D Kogl d Taabã"
              width="60"
              height="30"
              className="d-inline-block align-text-top me-3"
            />
            <strong>D Kogl d Taabã</strong>
          </Link>
        </div>

        {/* Recherche */}
        <form className="d-none d-md-flex" role="search" aria-label="Recherche">
          <input
            className="form-control form-control-sm"
            type="search"
            placeholder="Rechercher..."
            aria-label="Champ de recherche"
          />
        </form>
      </div>

      {/* Ligne inférieure : navigation */}
      <nav className="container-fluid px-4 py-1">
        <ul className="nav flex-wrap">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/alertes">Alertes</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/conseils">Conseils</Link>
          </li>

          {user ? (
            <>
              {user.role === "citoyen" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/signalement">Signalement</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/chat">Chat</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/profil/citoyen">Mon Profil</Link>
                  </li>
                </>
              )}

              {user.role === "agent" && (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/agent/espace">Espace Agent</Link>
                </li>
              )}

              {user.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profil/admin">Espace Admin</Link>
                </li>
              )}

              <li className="nav-item">
                <Link className="nav-link text-white" to="/logout">Déconnexion</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">Connexion</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/register">Inscription</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
