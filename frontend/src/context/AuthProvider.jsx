import { useEffect, useState } from "react";

import AuthContext from "./AuthContext";

import {
  getToken,
  getUser,
  saveToken,
  saveUser,
  clearAuth,
} from "../utils/storage";

import socket from "../services/socket";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());

  useEffect(() => {
    if (!token) return;

    socket.auth = { token };

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const login = ({ token, user }) => {
    saveToken(token);
    saveUser(user);

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    socket.disconnect();

    clearAuth();

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}