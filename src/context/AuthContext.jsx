import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getSession, clearSession, getCurrentUser, ensureAdminExists } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const session = getSession();
    return session ? getCurrentUser() : null;
  });

  useEffect(() => {
    ensureAdminExists();
    const session = getSession();
    if (session && !getCurrentUser()) {
      clearSession();
      setUser(null);
    }
  }, []);

  const login = useCallback(() => {
    setUser(getCurrentUser());
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const refreshUser = useCallback(() => {
    setUser(getCurrentUser());
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn:  !!user,
      isAdmin:     !!user?.isAdmin,
      login,
      logout,
      refreshUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>');
  return ctx;
};
