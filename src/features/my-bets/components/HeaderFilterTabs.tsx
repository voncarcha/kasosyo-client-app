import { cn } from '@/lib/utils/cn';
import type { BetFilter } from '../types/bet';
import { useBetFilterStore } from '../store/bet-filter-store';

const filters: { value: BetFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'CASHED_OUT', label: 'Cashed Out' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
];

export function HeaderFilterTabs() {
  const { activeFilter, setFilter } = useBetFilterStore();

  return (
    <div className="flex gap-1 overflow-x-auto">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => setFilter(filter.value)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap',
            activeFilter === filter.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
