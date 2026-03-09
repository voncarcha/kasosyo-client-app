import { Sun, Moon } from '@phosphor-icons/react';
import { useUIStore } from '@/store/ui-store';
import { useLocation } from '@tanstack/react-router';

const pageInfo: Record<string, { title: string; description: string }> = {
  '/home': { title: 'Home', description: 'Welcome to your dashboard' },
  '/profile': { title: 'Profile', description: 'Manage your account settings' },
  '/my-bets': { title: 'My Bets', description: 'View your betting history' },
  '/settings': { title: 'Settings', description: 'Manage your preferences' },
};

export function DashboardPageHeader() {
  const { theme, setTheme } = useUIStore();
  const location = useLocation();
  const current = pageInfo[location.pathname] || { title: 'Dashboard', description: '' };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-card px-4 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{current.title}</h2>
          {current.description && (
            <p className="text-xs text-muted-foreground">{current.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </header>
  );
}
