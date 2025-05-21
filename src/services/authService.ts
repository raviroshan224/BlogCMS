const TOKEN_KEY = "spellcms_token";

export const login = (email: string, password: string): boolean => {
  if (email === "admin@spellcms.com" && password === "admin123") {
    localStorage.setItem(TOKEN_KEY, "mock-token");
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};
