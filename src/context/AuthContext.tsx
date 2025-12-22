import React, { createContext, useContext, useEffect, useState } from "react";
import { signupUser, loginUser } from "@/api/users";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* =========================
     LOAD USER ON REFRESH
  ========================= */
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  /* =========================
     LOGIN
  ========================= */
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);

      if (!data.userId) {
        throw new Error("Login failed");
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     SIGNUP
  ========================= */
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await signupUser(name, email, password);
      // After signup, user goes to login screen
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

