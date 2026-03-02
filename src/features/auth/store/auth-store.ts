import { create } from 'zustand';
import type { AuthState, LoginStep } from '../types/auth';

interface AuthActions {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLoginStep: (step: LoginStep) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  loginStep: 'idle',
  username: null,

  login: async (username: string, password: string) => {
    set({ loginStep: 'authenticating' });
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    set({ loginStep: 'loading-permissions' });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (username && password) {
      set({ isAuthenticated: true, loginStep: 'success', username });
      return true;
    }
    
    set({ loginStep: 'idle' });
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, loginStep: 'idle', username: null });
  },

  setLoginStep: (step) => set({ loginStep: step }),
}));
