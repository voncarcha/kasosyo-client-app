import { createFileRoute } from '@tanstack/react-router';
import { CashOutPage } from '@/features/cash-out/components/CashOutPage';

export const Route = createFileRoute('/_dashboard/cash-out')({
  component: CashOutPage,
});
