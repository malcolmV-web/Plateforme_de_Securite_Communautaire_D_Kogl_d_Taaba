import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from './pages/Logout';
import Register from "./pages/Register";
import SignalementAccueil from "./pages/Signalement/Index";
import PointsAccueil from "./pages/Signalement/PointsAccueil";
import Demarches from "./pages/Signalement/Demarches";
import Chat from "./pages/Signalement/Chat";
import ProfilAgent from './pages/Profil/ProfilAgent';
import ChatAgent from "./pages/Agent/ChatAgent";
import EspaceAgent from "./pages/Agent/EspaceAgent";
import Alertes from "./pages/Alertes";
import AlerteDetail from "./pages/AlerteDetail";
import Conseils from "./pages/Conseils";
import ConseilDetail from "./pages/ConseilDetail";
import Profil from "./pages/Profil";
import ProfilAdmin from "./pages/admin/ProfilAdmin";
import { AuthProvider } from "./context/AuthContext";

// eslint-disable-next-line no-unused-vars
import api from "./axios"; 

import MainLayout from "./layouts/MainLayout";
import RequireRole from "./routes/RequireRole";
import ProfilCitoyen from "./pages/Profil/ProfilCitoyen";

function AppContent() {
  const { user } = useAuth(); 

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signalement" element={<SignalementAccueil />} />
        <Route path="/signalement/points" element={<PointsAccueil />} />
        <Route path="/signalement/demarches" element={<Demarches />} />
        <Route path="/signalement/chat" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/alertes" element={<Alertes />} />
        <Route path="/alertes/:id" element={<AlerteDetail />} />
        <Route path="/conseils" element={<Conseils />} />
        <Route path="/conseils/:id" element={<ConseilDetail />} />
        <Route path="/pages/profil" element={<Profil />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/profil/citoyen" element={<ProfilCitoyen />} />
        <Route path="/profil/agent" element={<ProfilAgent />} />
      


        {/* Citoyen */}
        {user?.role === "citoyen" && (
          <Route path="/home" element={<Home />} />
          )}

        {/* Agent */}
        {user?.role === "agent" && (
          <>
            <Route path="/agent/chat" element={<ChatAgent />} />
            <Route path="/agent/espace" element={<EspaceAgent />} />
          </>
        )}

        {/* Admin */}
        {user?.role === "admin" && (
          <Route path="/profil/admin" element={<ProfilAdmin />} />
        )}
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
