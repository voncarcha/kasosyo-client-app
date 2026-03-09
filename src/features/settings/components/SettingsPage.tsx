import { useState } from 'react';
import { SignOut, Sun, Clock, LockSimple } from '@phosphor-icons/react';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useUIStore } from '@/store/ui-store';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/toast';
import { PasswordChangeModal } from './PasswordChangeModal';

export function SettingsPage() {
  const { logout, username } = useAuthStore();
  const { theme, setTheme, timeFormat, setTimeFormat } = useUIStore();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  const handleThemeChange = (isDark: boolean) => {
    setTheme(isDark ? 'dark' : 'light');
    addToast('success', `Theme changed to ${isDark ? 'dark' : 'light'} mode`);
  };

  const handleTimeFormatChange = (is24Hour: boolean) => {
    setTimeFormat(is24Hour ? '24h' : '12h');
    addToast('success', `Time format changed to ${is24Hour ? '24-hour' : '12-hour'}`);
  };

  const handlePasswordChangeSuccess = () => {
    addToast('success', 'Password changed successfully');
  };

  return (
    <div className="p-6 pb-28">
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>

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
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sun className="h-5 w-5" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={handleThemeChange}
              />
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">24-Hour Time</p>
                <p className="text-xs text-muted-foreground">Use military/international time format</p>
              </div>
              <Switch
                checked={timeFormat === '24h'}
                onCheckedChange={handleTimeFormatChange}
              />
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card mt-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <LockSimple className="h-5 w-5" />
            Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your account password</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Change
              </Button>
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

      <PasswordChangeModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={handlePasswordChangeSuccess}
      />
    </div>
  );
}
