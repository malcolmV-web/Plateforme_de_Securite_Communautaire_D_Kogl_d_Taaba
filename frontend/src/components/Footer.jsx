import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-4 pb-3">
      <div className="container">
        <div className="row align-items-start mb-4">
          {/* Logo & Nom */}
          <div className="col-md-3 mb-4 mb-md-0">
            <div className="d-flex align-items-center">
              <img
                src="src/assets/logo.png"
                alt="Logo D Kogl d Taabã"
                width="50"
                height="50"
                className="me-3"
              />
              <h5 className="mb-0">D Kogl d Taabã</h5>
            </div>
          </div>

          {/* Liens rapides */}
          <nav className="col-md-3 mb-4 mb-md-0" aria-label="Liens rapides">
            <h6>Liens rapides</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Accueil</Link></li>
              <li><Link to="/signalement" className="text-white text-decoration-none">Signalement</Link></li>
              <li><Link to="/alertes" className="text-white text-decoration-none">Alertes</Link></li>
              <li><Link to="/conseils" className="text-white text-decoration-none">Conseils</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-md-3 mb-4 mb-md-0">
            <h6>Contactez-nous</h6>
            <address>
              <a href="mailto:contact@dkogldtaaba.bf" className="text-white text-decoration-none d-block">
                contact@dkogldtaaba.bf
              </a>
              <span className="d-block">+226 25 00 00 00</span>
            </address>
          </div>

          {/* Réseaux sociaux */}
          <div className="col-md-3 text-center text-md-end">
            <h6>Suivez-nous</h6>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 fs-5">
              <a href="https://facebook.com/dkogldtaaba" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/dkogldtaaba" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/dkogldtaaba" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com/company/dkogldtaaba" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="text-white">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Mentions légales */}
        <div className="text-center border-top pt-3">
          <small>© 2025 D Kogl d Taabã – Tous droits réservés – <Link to="/mentions-legales" className="text-white text-decoration-underline">Mentions légales</Link></small>
        </div>
      </div>
    </footer>
  );
}
