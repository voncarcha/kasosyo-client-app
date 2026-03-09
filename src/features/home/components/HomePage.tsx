import { TrophyIcon, TrendUpIcon } from '@phosphor-icons/react';
import { StatCard } from './StatCard';
import { BetCountChart } from './BetCountChart';
import { SportDistributionChart } from './SportDistributionChart';
import { 
  mockDashboardStats, 
  mockMonthlyBetCounts, 
  mockSportDistribution 
} from '../data/mock-dashboard';

export function HomePage() {
  return (
    <div className="p-6 space-y-6 pb-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard 
          title="Winning Bet Amount" 
          value={`$${mockDashboardStats.winningBetAmount.toLocaleString()}`}
          icon={<TrophyIcon className="h-8 w-8" weight="duotone" />}
        />
        <StatCard 
          title="Won Bet Count" 
          value={mockDashboardStats.wonBetCount.toString()}
          icon={<TrendUpIcon className="h-8 w-8" weight="duotone" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BetCountChart data={mockMonthlyBetCounts} />
        <SportDistributionChart data={mockSportDistribution} />
      </div>
    </div>
  );
}
