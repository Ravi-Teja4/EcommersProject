import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* =========================
   TYPES
========================= */
interface AuthUser {
  userId: string;
  name: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

/* =========================
   CONFIG
========================= */
const API_BASE_URL =
  "https://wcldx9f5u0.execute-api.us-east-1.amazonaws.com";

/* =========================
   CONTEXT
========================= */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =========================
   PROVIDER
========================= */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* Load user from localStorage on refresh */
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  /* =========================
     SIGN UP
  ========================= */
  const signUp = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword: password,
        }),
      });

      const data = await res.json();
      return res.ok;
    } catch (err) {
      console.error("Signup error:", err);
      return false;
    }
  };

  /* =========================
     SIGN IN
  ========================= */
  const signIn = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) return false;

      const loggedUser: AuthUser = {
        userId: data.userId,
        name: data.name,
      };

      setUser(loggedUser);
      localStorage.setItem("authUser", JSON.stringify(loggedUser));

      return true;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  /* =========================
     SIGN OUT
  ========================= */
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  /* =========================
     CONTEXT VALUE
  ========================= */
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signUp,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================
   HOOK
========================= */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
