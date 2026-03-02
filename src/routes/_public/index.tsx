import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/')({
  beforeLoad: async () => {
    throw redirect({ to: '/login' });
  },
});
