import { Outlet } from '@tanstack/react-router';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardPageHeader } from './DashboardPageHeader';
import { DashboardSkeleton } from './DashboardSkeleton';
import { DashboardBottomNav } from './DashboardBottomNav';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { FloatingButton, QRScannerModal } from '@/features/ticket-scanner';

export function DashboardLayout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="flex flex-col lg:flex-row h-full">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardPageHeader />
          <main className="flex-1 overflow-y-auto pb-16 lg:pb-0">
            <Outlet />
          </main>
        </div>
      </div>
      <DashboardBottomNav />
      <FloatingButton />
      <QRScannerModal />
    </div>
  );
}
