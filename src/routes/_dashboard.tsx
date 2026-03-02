import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { DashboardLayout } from '@/features/dashboard/components/DashboardLayout';

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: DashboardLayout,
});
