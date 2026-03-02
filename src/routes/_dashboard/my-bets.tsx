import { createFileRoute } from '@tanstack/react-router';
import { MyBetsPage } from '@/features/my-bets/components/MyBetsPage';

export const Route = createFileRoute('/_dashboard/my-bets')({
  component: MyBetsPage,
});
