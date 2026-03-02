import { createFileRoute } from '@tanstack/react-router';
import { TransactionsPage } from '@/features/transactions/components/TransactionsPage';

export const Route = createFileRoute('/_dashboard/transactions')({
  component: TransactionsPage,
});
