import { create } from 'zustand';
import { loginAPI, signupAPI, getMeAPI } from '../api/authApi';

const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await signupAPI({ name, email, password, confirmPassword });
      const { user, token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
      return res;
    } catch (error) {
      const message =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        'Signup failed';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const res = await loginAPI({ email, password });
      const { user, token } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      set({ user, token, isAuthenticated: true, isLoading: false });
      return res;
    } catch (error) {
      const message =
        error.response?.data?.errors?.[0] ||
        error.response?.data?.message ||
        'Login failed';
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null });
      return;
    }
    try {
      const res = await getMeAPI();
      set({ user: res.data, isAuthenticated: true, token });
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ isAuthenticated: false, user: null, token: null });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
