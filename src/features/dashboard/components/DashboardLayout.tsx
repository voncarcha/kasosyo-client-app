import { Outlet } from '@tanstack/react-router';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardPageHeader } from './DashboardPageHeader';
import { DashboardSkeleton } from './DashboardSkeleton';
import { DashboardBottomNav } from './DashboardBottomNav';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function DashboardLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isMounted, isAuthenticated, navigate]);

  if (!isMounted || !isAuthenticated) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex flex-col lg:flex-row h-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden pb-16 lg:pb-0">
          <DashboardPageHeader />
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      <DashboardBottomNav />
    </div>
  );
}
