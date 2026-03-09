import { create } from 'zustand';
import type { AuthState, LoginStep } from '../types/auth';
import type { User } from '@/features/profile/types/profile';
import { MOCK_USER } from '@/features/profile/data/mock-profile';

interface AuthActions {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLoginStep: (step: LoginStep) => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isAuthenticated: false,
  loginStep: 'idle',
  username: null,
  user: null,

  login: async (username: string, password: string) => {
    set({ loginStep: 'authenticating' });
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    set({ loginStep: 'loading-permissions' });
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    if (username && password) {
      set({ 
        isAuthenticated: true, 
        loginStep: 'success', 
        username,
        user: { ...MOCK_USER, firstName: username }
      });
      return true;
    }
    
    set({ loginStep: 'idle' });
    return false;
  },

  logout: () => {
    set({ isAuthenticated: false, loginStep: 'idle', username: null, user: null });
  },

  setLoginStep: (step) => set({ loginStep: step }),

  updateUser: (userData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null
    }));
  },
}));
