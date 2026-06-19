import { createContext, useContext, useEffect, useMemo, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveSession = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await authService.getMe();
      const userData = data?.user ?? data;
      setUser(userData);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      clearSession();
      setError(err?.response?.data?.message || "Session expired. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const signup = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.signup(payload);
      saveSession(data.token, data.user);
      setError(null);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.login(payload);
      saveSession(data.token, data.user);
      setError(null);
      return data;
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearSession();
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      login,
      signup,
      logout,
    }),
    [user, isAuthenticated, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
