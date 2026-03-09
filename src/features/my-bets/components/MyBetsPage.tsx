import { useState } from 'react';
import { FadersHorizontal } from '@phosphor-icons/react';
import { PointsHeader } from './PointsHeader';
import { FilterTabs } from './FilterTabs';
import { BetCard } from './BetCard';
import { BetDetailsSheet } from './BetDetailsSheet';
import { mockBets } from '../data/mock-bets';
import type { Bet, BetFilter } from '../types/bet';

export function MyBetsPage() {
  const [activeFilter, setActiveFilter] = useState<BetFilter>('ALL');
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredBets = mockBets.filter((bet) => {
    if (activeFilter === 'ALL') return true;
    return bet.status === activeFilter;
  });

  const handleSeeDetails = (bet: Bet) => {
    setSelectedBet(bet);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="sticky top-16 z-20">
        <PointsHeader />
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      <div className="p-4 space-y-3 pb-28">
        {filteredBets.length > 0 ? (
          filteredBets.map((bet) => (
            <BetCard key={bet.id} bet={bet} onSeeDetails={handleSeeDetails} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FadersHorizontal className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No bets found</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Try selecting a different filter
            </p>
          </div>
        )}
      </div>

      <BetDetailsSheet
        bet={selectedBet}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
      />
    </div>
  );
}
