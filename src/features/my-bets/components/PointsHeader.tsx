import { Coin } from '@phosphor-icons/react';
import { mockUserPoints } from '../data/mock-bets';

export function PointsHeader() {
  return (
    <div className="px-4 py-5 bg-card border-b border-border">
      <div className="flex items-center gap-2">
        <Coin className="h-6 w-6 text-primary" weight="fill" />
        <span className="text-2xl font-bold text-foreground">
          {mockUserPoints.toLocaleString()}
        </span>
        <span className="text-sm text-muted-foreground">points</span>
      </div>
    </div>
  );
}
