export type LoginStep = 'idle' | 'authenticating' | 'loading-permissions' | 'success';

export interface AuthState {
  isAuthenticated: boolean;
  loginStep: LoginStep;
  username: string | null;
}
