import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from "axios";
import { apiConfig } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = useCallback(() => {
    setLoading(true);
    console.log("Checking auth status");
    axios.get(`${apiConfig.API_URL}/auth/status`, {
      withCredentials: true,
    })
      .then(response => {
        setIsAuthenticated(response.data.isAuthenticated);
        console.log("Authenticated:", response.data.isAuthenticated);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const revalidateAuth = () => {
    checkAuthStatus();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, revalidateAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);