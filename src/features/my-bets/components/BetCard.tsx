import { CaretRight } from '@phosphor-icons/react';
import { cn } from '@/lib/utils/cn';
import type { Bet, BetStatus } from '../types/bet';

interface BetCardProps {
  bet: Bet;
  onSeeDetails: (bet: Bet) => void;
}

const statusConfig: Record<BetStatus, { label: string; className: string }> = {
  WON: { label: 'Won', className: 'bg-green-500/20 text-green-600 dark:text-green-400' },
  LOST: { label: 'Lost', className: 'bg-red-500/20 text-red-600 dark:text-red-400' },
  ACCEPTED: { label: 'Accepted', className: 'bg-blue-500/20 text-blue-600 dark:text-blue-400' },
  CASHED_OUT: { label: 'Cashed Out', className: 'bg-purple-500/20 text-purple-600 dark:text-purple-400' },
  RETURNED: { label: 'Returned', className: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' },
};

function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function formatCurrency(amount: number): string {
  return amount.toFixed(2);
}

export function BetCard({ bet, onSeeDetails }: BetCardProps) {
  const status = statusConfig[bet.status];

  return (
    <div className="border border-border rounded-lg bg-card p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {bet.type}
          </span>
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
            {status.label}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatDateTime(bet.dateTime)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Bet Amount</span>
          <span className="font-medium text-foreground">${formatCurrency(bet.amount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Odd</span>
          <span className="font-medium text-foreground">{bet.odd}</span>
        </div>
        {(bet.status === 'WON' || bet.status === 'RETURNED' || bet.status === 'CASHED_OUT') && bet.wonAmount && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {bet.status === 'CASHED_OUT' ? 'Cashed Out' : 'Won Amount'}
            </span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              ${formatCurrency(bet.wonAmount)}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        {bet.status === 'WON' ? (
          <button
            onClick={() => {
              // TODO: Implement cash out functionality
              console.log('Cash out bet:', bet.id);
            }}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Cash Out
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={() => onSeeDetails(bet)}
          className="flex items-center gap-1 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          See Details
          <CaretRight className="h-4 w-4" weight="bold" />
        </button>
      </div>
    </div>
  );
}
