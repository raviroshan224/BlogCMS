// src/store/useAuthStore.ts

import { create } from "zustand";
import { isAuthenticated as checkAuthToken, login as authLogin, logout as authLogout } from "../services/authService";

interface AuthState {
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: checkAuthToken(),

  login: (email, password) => {
    const success = authLogin(email, password);
    if (success) {
      set({ isLoggedIn: true });
    }
    return success;
  },

  logout: () => {
    authLogout();
    set({ isLoggedIn: false });
  },

  checkAuth: () => {
    set({ isLoggedIn: checkAuthToken() });
  },
}));
