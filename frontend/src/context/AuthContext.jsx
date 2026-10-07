import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api, getToken, setToken } from '../api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('fh_user') || 'null');
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [loading, setLoading] = useState(Boolean(getToken()));

  const clearSession = useCallback(() => {
    setToken(null);
    localStorage.removeItem('fh_user');
    setUser(null);
  }, []);

  const saveSession = useCallback((data) => {
    setToken(data.token);
    localStorage.setItem('fh_user', JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  // Verify the stored token once on load
  useEffect(() => {
    if (!getToken()) return;
    api
      .get('/users/profile')
      .then((profile) => {
        localStorage.setItem('fh_user', JSON.stringify(profile));
        setUser(profile);
      })
      .catch((e) => {
        if (e.status === 401) clearSession();
      })
      .finally(() => setLoading(false));
  }, [clearSession]);

  useEffect(() => {
    window.addEventListener('fh:unauthorized', clearSession);
    return () => window.removeEventListener('fh:unauthorized', clearSession);
  }, [clearSession]);

  const login = async (email, password) =>
    saveSession(await api.post('/users/login', { email, password }, { auth: false }));

  const register = async (name, email, password) =>
    saveSession(await api.post('/users/register', { name, email, password }, { auth: false }));

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout: clearSession }}>
      {children}
    </AuthContext.Provider>
  );
}
