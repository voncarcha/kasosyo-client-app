import type { DashboardStats, MonthlyBetCount, SportDistribution } from '../types/dashboard';

export const mockDashboardStats: DashboardStats = {
  winningBetAmount: 12850,
  wonBetCount: 47,
};

export const mockMonthlyBetCounts: MonthlyBetCount[] = [
  { month: 'May', count: 12 },
  { month: 'Jun', count: 18 },
  { month: 'Jul', count: 25 },
  { month: 'Aug', count: 31 },
  { month: 'Sep', count: 22 },
];

export const mockSportDistribution: SportDistribution[] = [
  { sport: 'Football', percentage: 66, color: '#10b981' },
  { sport: 'Basketball', percentage: 16, color: '#3b82f6' },
  { sport: 'Counter-Strike', percentage: 5, color: '#8b5cf6' },
  { sport: 'Others', percentage: 13, color: '#6b7280' },
];
