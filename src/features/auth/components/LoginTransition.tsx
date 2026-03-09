import { CheckCircleIcon, SpinnerIcon, UserCircleIcon } from '@phosphor-icons/react';
import type { LoginStep } from '../types/auth';

interface LoginTransitionProps {
  step: LoginStep;
}

export function LoginTransition({ step }: LoginTransitionProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card border border-border rounded-lg shadow-xl p-8 max-w-sm w-full mx-4">
        {step === 'authenticating' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <SpinnerIcon className="h-12 w-12 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Authenticating</h3>
              <p className="text-sm text-muted-foreground mt-1">Verifying your credentials...</p>
            </div>
          </div>
        )}

        {step === 'loading-permissions' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <UserCircleIcon className="h-12 w-12 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Loading Permissions</h3>
              <p className="text-sm text-muted-foreground mt-1">Fetching your account details...</p>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircleIcon className="h-12 w-12 text-green-500" weight="fill" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Success!</h3>
              <p className="text-sm text-muted-foreground mt-1">Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        <div className="mt-6">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{
                width: step === 'authenticating' ? '33%' : step === 'loading-permissions' ? '66%' : '100%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
