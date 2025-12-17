AuthContext.tsx

import React, { createContext, useContext, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<{ data: any; error: any }>;
  signInWithGoogle: () => Promise<{ data: any; error: any }>;
  signInWithGithub: () => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useSupabaseAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};




Modify this
