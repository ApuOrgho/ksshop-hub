// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with backend session check (e.g., check localStorage for JWT)
  useEffect(() => {
    setLoading(false);
  }, []);

  const logout = async () => {
    // TODO: Call backend logout API and clear session
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, logout, emailVerified: true }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}
