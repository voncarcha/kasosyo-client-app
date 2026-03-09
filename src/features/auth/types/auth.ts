import type { User } from '@/features/profile/types/profile';

export type LoginStep = 'idle' | 'authenticating' | 'loading-permissions' | 'success';

export interface AuthState {
  isAuthenticated: boolean;
  loginStep: LoginStep;
  username: string | null;
  user: User | null;
}
