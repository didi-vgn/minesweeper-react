import { useContext, createContext, useState, useEffect } from "react";
import { isTokenValid } from "../utils/authUtils";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decoded = JSON.parse(atob(storedToken.split(".")[1]));

        const valid = isTokenValid(storedToken);
        if (!valid) {
          console.warn("Access Token expired, logging out");
          logout();
          return;
        }

        setUser({
          id: decoded.id,
          username: decoded.username,
          nickname: decoded.nickname,
          role: decoded.role,
        });
        setToken(storedToken);
      } catch (err) {
        console.error("Invalid token.");
        logout();
      }
    }
  }, []);

  function login(token) {
    localStorage.setItem("token", token);
    const decoded = JSON.parse(atob(token.split(".")[1]));
    setUser({
      id: decoded.id,
      username: decoded.username,
      nickname: decoded.nickname,
      role: decoded.role,
    });
    setToken(token);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
