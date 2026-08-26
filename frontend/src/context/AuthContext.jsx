import { createContext, useContext, useState } from "react";
import { clearSession, getStoredUser, setSession } from "../auth/tokenStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser());

  // Appele apres /api/auth/login/ ou /api/auth/register/ : persiste les
  // tokens JWT + le user, et met a jour l'etat React.
  const login = ({ access, refresh, user: userData }) => {
    setSession({ access, refresh, user: userData });
    setUser(userData);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
