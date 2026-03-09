import { X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils/cn';
import type { Bet, BetStatus, BetSelection } from '../types/bet';

interface BetDetailsSheetProps {
  bet: Bet | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig: Record<BetStatus, { label: string; className: string }> = {
  WON: { label: 'Won', className: 'bg-green-500/20 text-green-600 dark:text-green-400' },
  LOST: { label: 'Lost', className: 'bg-red-500/20 text-red-600 dark:text-red-400' },
  ACCEPTED: { label: 'Accepted', className: 'bg-blue-500/20 text-blue-600 dark:text-blue-400' },
  CASHED_OUT: { label: 'Cashed Out', className: 'bg-purple-500/20 text-purple-600 dark:text-purple-400' },
  RETURNED: { label: 'Returned', className: 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' },
};

const resultConfig: Record<string, { className: string }> = {
  WON: { className: 'text-green-600 dark:text-green-400' },
  LOST: { className: 'text-red-600 dark:text-red-400' },
  PENDING: { className: 'text-muted-foreground' },
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

function SelectionItem({ selection }: { selection: BetSelection }) {
  const resultStyle = selection.result ? resultConfig[selection.result] : null;

  return (
    <div className="border border-border rounded-lg p-3 bg-muted/30">
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{selection.event}</span>
        {selection.result && (
          <span className={cn('text-xs font-medium', resultStyle?.className)}>
            {selection.result}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Market</span>
          <span className="text-foreground">{selection.market}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Selection</span>
          <span className="text-foreground">{selection.selection}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Odd</span>
          <span className="text-foreground">{selection.odd}</span>
        </div>
      </div>
    </div>
  );
}

export function BetDetailsSheet({ bet, isOpen, onClose }: BetDetailsSheetProps) {
  if (!bet) return null;

  const status = statusConfig[bet.status];

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden lg:hidden',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="sticky top-0 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Bet Details</h3>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="overflow-y-auto p-4 pb-[6.5rem] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {bet.type}
              </span>
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
                {status.label}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatDateTime(bet.dateTime)}
            </span>
          </div>

          <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bet Amount</span>
              <span className="font-medium text-foreground">${formatCurrency(bet.amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Total Odd</span>
              <span className="font-medium text-foreground">{bet.odd}</span>
            </div>
            {(bet.status === 'WON' || bet.status === 'RETURNED' || bet.status === 'CASHED_OUT') && bet.wonAmount && (
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-sm text-muted-foreground">
                  {bet.status === 'CASHED_OUT' ? 'Cashed Out' : 'Won Amount'}
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  ${formatCurrency(bet.wonAmount)}
                </span>
              </div>
            )}
          </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Selections ({bet.selections.length})
              </h4>
              <div className="space-y-2">
                {bet.selections.map((selection) => (
                  <SelectionItem key={selection.id} selection={selection} />
                ))}
              </div>
            </div>

            {bet.status === 'WON' && (
              <button
                onClick={() => {
                  // TODO: Implement cash out functionality
                  console.log('Cash out bet:', bet.id);
                }}
                className="w-full px-4 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Cash Out
              </button>
            )}
          </div>
        </div>

        <div
        className={cn(
          'hidden lg:flex fixed inset-0 z-50 items-center justify-center p-4',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="bg-card rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-xl">
          <div className="sticky top-0 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Bet Details</h3>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          <div className="overflow-y-auto p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  {bet.type}
                </span>
                <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', status.className)}>
                  {status.label}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDateTime(bet.dateTime)}
              </span>
            </div>

            <div className="border border-border rounded-lg p-4 bg-muted/30 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Bet Amount</span>
                <span className="font-medium text-foreground">${formatCurrency(bet.amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Odd</span>
                <span className="font-medium text-foreground">{bet.odd}</span>
              </div>
              {(bet.status === 'WON' || bet.status === 'RETURNED' || bet.status === 'CASHED_OUT') && bet.wonAmount && (
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    {bet.status === 'CASHED_OUT' ? 'Cashed Out' : 'Won Amount'}
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    ${formatCurrency(bet.wonAmount)}
                  </span>
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Selections ({bet.selections.length})
              </h4>
              <div className="space-y-2">
                {bet.selections.map((selection) => (
                  <SelectionItem key={selection.id} selection={selection} />
                ))}
              </div>
            </div>

            {bet.status === 'WON' && (
              <button
                onClick={() => {
                  // TODO: Implement cash out functionality
                  console.log('Cash out bet:', bet.id);
                }}
                className="w-full px-4 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Cash Out
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
