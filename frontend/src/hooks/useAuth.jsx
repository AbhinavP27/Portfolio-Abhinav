import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authClient, tokenStore } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const bootstrap = async () => {
    const access = tokenStore.getAccess();
    if (!access) {
      setLoading(false);
      return;
    }

    try {
      const response = await authClient.get('/me/', {
        headers: { Authorization: `Bearer ${access}` },
      });
      setUser(response.data);
    } catch {
      tokenStore.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bootstrap();
  }, []);

  const login = async (username, password) => {
    const response = await authClient.post('/login/', { username, password });
    tokenStore.setTokens({ access: response.data.access, refresh: response.data.refresh });
    setUser(response.data.user);
    return response.data.user;
  };

  const logout = () => {
    tokenStore.clear();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, isAuthenticated: Boolean(user), isAdmin: Boolean(user?.is_staff) }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="grid min-h-screen place-content-center text-slate-200">Loading...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
