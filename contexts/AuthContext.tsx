"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  LoginData,
  User,
} from "@/types/auth";

import {
  loginUser,
  logoutUser,
} from "@/services/auth";

import {
  saveAuthSession,
  clearAuthSession,
  getStoredUser,
} from "@/utils/authStorage";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (
    data: LoginData
  ) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (
    user: User | null
  ) => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const storedUser =
      getStoredUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const login = async (
    data: LoginData
  ) => {
    const response =
      await loginUser(data);

    saveAuthSession(
      response.accessToken,
      response.refreshToken,
      response.user
    );

    setUser(response.user);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }

    clearAuthSession();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used inside AuthProvider"
    );
  }

  return context;
}