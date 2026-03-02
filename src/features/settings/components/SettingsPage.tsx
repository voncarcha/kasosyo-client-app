import { SignOut } from '@phosphor-icons/react';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export function SettingsPage() {
  const { logout, username } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl">
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Username</p>
              <p className="text-foreground">{username || 'User'}</p>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <div className="h-4 w-24 bg-muted rounded mb-2" />
              <div className="h-10 w-full bg-muted rounded" />
            </div>
            <div>
              <div className="h-4 w-24 bg-muted rounded mb-2" />
              <div className="h-10 w-full bg-muted rounded" />
            </div>
            <div>
              <div className="h-4 w-24 bg-muted rounded mb-2" />
              <div className="h-10 w-full bg-muted rounded" />
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-32 bg-muted rounded mb-2" />
                <div className="h-3 w-48 bg-muted rounded" />
              </div>
              <div className="h-6 w-11 bg-muted rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-32 bg-muted rounded mb-2" />
                <div className="h-3 w-48 bg-muted rounded" />
              </div>
              <div className="h-6 w-11 bg-muted rounded-full" />
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Session</h2>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <SignOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
