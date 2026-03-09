import { cn } from '@/lib/utils/cn';
import type { BetFilter } from '../types/bet';

interface FilterTabsProps {
  activeFilter: BetFilter;
  onFilterChange: (filter: BetFilter) => void;
}

const filters: { value: BetFilter; label: string }[] = [
  { value: 'ALL', label: 'All' },
  { value: 'ACCEPTED', label: 'Accepted' },
  { value: 'CASHED_OUT', label: 'Cashed Out' },
  { value: 'WON', label: 'Won' },
  { value: 'LOST', label: 'Lost' },
];

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="px-4 py-3 bg-card border-b border-border overflow-x-auto">
      <div className="flex gap-2 min-w-max">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap',
              activeFilter === filter.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
