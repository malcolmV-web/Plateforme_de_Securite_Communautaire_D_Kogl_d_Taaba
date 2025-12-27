import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <>
      {/* Barre de navigation principale */}
      <Navbar toggleSidebar={toggleSidebar} />

      {/* Barre latérale (ouverte selon l'état) */}
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} user={user} />

      {/* Overlay visuel si la sidebar est ouverte (utile sur mobile) */}
      {isSidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040, cursor: "pointer" }}
          aria-label="Fermer la barre latérale"
          onClick={toggleSidebar}
        />
      )}

      {/* Contenu principal (Outlet = composant enfant selon la route) */}
      <main className="container-fluid px-4 py-3" style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>

      {/* Pied de page */}
      <Footer />
    </>
  );
}
