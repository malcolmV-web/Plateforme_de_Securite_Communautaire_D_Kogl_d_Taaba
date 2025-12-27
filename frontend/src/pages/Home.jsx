import { Link } from "react-router-dom";
import signalementImg from "../assets/signalement.webp";
import conseilsImg from "../assets/conseils.jpg";


export default function Home() {
  return (
    <div className="container-fluid py-5 px-4">
           {/* En-tête */}
      <h1 className="mb-4 text-center">
        Bienvenue sur <strong>D Kogl d Taabã</strong>
      </h1>
      <p className="lead text-center mb-5">
        Votre plateforme communautaire de sécurité au Burkina Faso.
      </p>

      {/* Cartes principales */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-exclamation-triangle text-danger" style={{ fontSize: "2rem" }}></i>
              <h5 className="card-title mt-3">Alertes</h5>
              <p className="card-text">Consultez les alertes de sécurité en temps réel dans votre région.</p>
              <Link to="/alertes" className="btn btn-outline-primary">Voir les alertes</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-flag-fill text-warning" style={{ fontSize: "2rem" }}></i>
              <h5 className="card-title mt-3">Signalement</h5>
              <p className="card-text">Signalez facilement un incident ou un danger dans votre zone.</p>
              <Link to="/signalement" className="btn btn-outline-primary">Faire un signalement</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
              <i className="bi bi-shield-check text-success" style={{ fontSize: "2rem" }}></i>
              <h5 className="card-title mt-3">Conseils</h5>
              <p className="card-text">Lisez nos conseils pratiques pour renforcer votre sécurité.</p>
              <Link to="/conseils" className="btn btn-outline-primary">Voir les conseils</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section autres fonctionnalités */}
      <div className="row text-center mb-5">
        <div className="col-md-4 mb-4">
          <i className="bi bi-chat-left-text text-info" style={{ fontSize: "2rem" }}></i>
          <h5 className="mt-2">Chat communautaire</h5>
          <p>Échangez avec d'autres citoyens et les agents de sécurité.</p>
        </div>
        <div className="col-md-4 mb-4">
          <i className="bi bi-person-circle text-secondary" style={{ fontSize: "2rem" }}></i>
          <h5 className="mt-2">Profil personnel</h5>
          <p>Gérez vos informations et vos signalements.</p>
        </div>
        <div className="col-md-4 mb-4">
          <i className="bi bi-tools text-dark" style={{ fontSize: "2rem" }}></i>
          <h5 className="mt-2">Espace Agent/Admin</h5>
          <p>Fonctionnalités avancées pour la gestion des signalements et utilisateurs.</p>
        </div>
      </div>

      {/* Section avec images */}
      <div className="row text-center mb-5">
        <div className="col-md-6 mb-4">
          <img src={signalementImg} alt="Signaler" className="img-fluid rounded mb-2" />
          <h5>Participer à la vigilance collective</h5>
          <p className="text-muted">
            Chaque citoyen est un acteur de la sécurité. Contribuez par vos signalements.
          </p>
        </div>
        <div className="col-md-6 mb-4">
          <img src={conseilsImg} alt="Conseils" className="img-fluid rounded mb-2" />
          <h5>Se protéger efficacement</h5>
          <p className="text-muted">
            Apprenez les bons réflexes pour réagir face aux situations à risque.
          </p>
        </div>
      </div>

      {/* Section À propos */}
      <div className="bg-light p-4 rounded shadow-sm mb-5">
        <h4>Notre mission</h4>
        <p>
          <strong>D Kogl d Taabã</strong> vise à renforcer la sécurité communautaire au Burkina Faso
          en connectant les citoyens, les agents de terrain et les autorités autour d'une plateforme intuitive et collaborative.
        </p>
        <p>
          Grâce à la technologie, chaque signalement compte et peut sauver des vies.
        </p>
        <Link to="/register" className="btn btn-outline-primary">Rejoignez-nous</Link>
      </div>

      {/* Témoignages d’utilisateurs */}
      <section className="bg-light p-4 rounded shadow-sm mb-5">
        <h3 className="mb-4">Témoignages</h3>
        <div className="row">
          <div className="col-md-4">
            <blockquote className="blockquote border-start border-3 ps-3">
              <p>"Grâce à D Kogl d Taabã, j'ai pu signaler un cambriolage en toute simplicité."</p>
              <footer className="blockquote-footer">Awa, Ouagadougou</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="blockquote border-start border-3 ps-3">
              <p>"Une application utile pour rester informé et alerter rapidement."</p>
              <footer className="blockquote-footer">Issouf, Bobo-Dioulasso</footer>
            </blockquote>
          </div>
          <div className="col-md-4">
            <blockquote className="blockquote border-start border-3 ps-3">
              <p>"L’espace agent m’aide à mieux suivre les signalements et à répondre vite."</p>
              <footer className="blockquote-footer">Agent Koné, Koudougou</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="mt-5">
        <h3>Contactez-nous</h3>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Nom</label>
            <input type="text" className="form-control" id="name" placeholder="Votre nom" />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Adresse e-mail</label>
            <input type="email" className="form-control" id="email" placeholder="Votre email" />
          </div>
          <div className="col-12">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Votre message"></textarea>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Envoyer</button>
          </div>
        </form>
      </section>

      {/* Carte de géolocalisation */}
      <section className="mt-5">
        <h3>Où nous trouver</h3>
        <div style={{ width: "100%", height: "400px" }}>
          <iframe
            title="Carte Ouagadougou"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.433576908306!2d-1.5331681846747022!3d12.371428390857295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xe2a460ee6fa5e3d%3A0xf8a8b03d5282f0b4!2sOuagadougou%2C%20Burkina%20Faso!5e0!3m2!1sfr!2sus!4v1687023841837!5m2!1sfr!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
}
