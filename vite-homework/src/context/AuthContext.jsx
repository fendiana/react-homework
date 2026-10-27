import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthStatus } from "../api/todosApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let isCurrent = true;

    const checkAuth = async () => {
      try {
        const authenticted = await getAuthStatus();

        if (isCurrent) {
          setIsAuthenticated(authenticted);
        }
      } catch (error) {
        console.error("Authentication error:", error);

        if (isCurrent) {
          navigate("/error-page", {
            replace: true,
            state: { message: "Couldn't check authentication :(" },
          });
        }
      } finally {
        if (isCurrent) {
          setIsAuthLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isCurrent = false;
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside of AuthProvider");
  }

  return context;
};
