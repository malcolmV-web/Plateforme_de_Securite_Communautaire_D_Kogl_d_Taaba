import { Navigate } from "react-router-dom";

// Cette page faisait doublon avec Agent/EspaceAgent.jsx (memes donnees,
// capacites en moins : pas de regroupement par citoyen, reponse sans
// selection de destinataire). Jamais liee depuis la Navbar/Sidebar, et le
// login redirige deja l'agent vers /agent/espace. On redirige ici plutot
// que de maintenir deux implementations divergentes du meme ecran.
export default function ProfilAgent() {
  return <Navigate to="/agent/espace" replace />;
}
