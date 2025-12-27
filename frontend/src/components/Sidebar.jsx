import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";


export default function Sidebar({ isOpen, onClose, user }) {
  return (
    <aside
      className={`position-fixed top-0 start-0 bg-light shadow h-100 p-3`}
      style={{
        width: '250px',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        zIndex: 1050,
        transition: 'transform 0.3s ease-in-out'
      }}
      aria-hidden={!isOpen}
    >
      {/* Bouton de fermeture */}
      <button
        className="btn btn-sm btn-outline-secondary mb-4"
        onClick={onClose}
        aria-label="Fermer le menu latéral"
      >
        ✕ Fermer
      </button>

      {/* Liens de navigation */}
      <nav>
        <ul className="list-unstyled">
          <li><Link to="/" onClick={onClose}>Accueil</Link></li>
          <li><Link to="/alertes" onClick={onClose}>Alertes</Link></li>
          <li><Link to="/conseils" onClick={onClose}>Conseils</Link></li>

          {user && user.role === "citoyen" && (
            <>
              <li><Link to="/signalement" onClick={onClose}>Signalement</Link></li>
              <li><Link to="/chat" onClick={onClose}>Chat</Link></li>
              <li><Link to="/profil/citoyen" onClick={onClose}>Mon Profil</Link></li>
            </>
          )}

          {user?.role === "agent" && (
            <li><Link to="/agent/espace" onClick={onClose}>Espace Agent</Link></li>
          )}

          {user?.role === "admin" && (
            <li><Link to="/profil/admin" onClick={onClose}>Espace Admin</Link></li>
          )}

          {user ? (
            <li><Link to="/logout" onClick={onClose}>Déconnexion</Link></li>
          ) : (
            <>
              <li><Link to="/login" onClick={onClose}>Connexion</Link></li>
              <li><Link to="/register" onClick={onClose}>Inscription</Link></li>
            </>
          )}
        </ul>
      </nav>
      <NavLink to="/" className={({ isActive }) => isActive ? "fw-bold text-primary" : ""}>
        Accueil
      </NavLink>
    </aside>
  );
}
