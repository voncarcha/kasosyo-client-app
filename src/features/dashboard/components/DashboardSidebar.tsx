import { SignOutIcon, ListIcon } from '@phosphor-icons/react';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils/cn';
import { useUIStore } from '@/store/ui-store';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { navigationItems } from '../config/navigation';

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarExpanded, toggleSidebar } = useUIStore();
  const { logout, username } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col bg-card border-r border-border transition-all duration-300',
        sidebarExpanded ? 'w-[280px]' : 'w-[80px]',
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-border">
        {sidebarExpanded && (
          <h1 className="text-xl font-bold text-primary">Kasosyo</h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-accent transition-colors"
        >
          <ListIcon className={cn("h-5 w-5 transition-transform", !sidebarExpanded && "rotate-180")} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                !sidebarExpanded && 'justify-center',
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {sidebarExpanded && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        {sidebarExpanded && (
          <div className="mb-3 px-3">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="text-sm font-medium text-foreground truncate">{username || 'User'}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors',
            !sidebarExpanded && 'justify-center',
          )}
        >
          <SignOutIcon className="h-5 w-5 flex-shrink-0" />
          {sidebarExpanded && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
