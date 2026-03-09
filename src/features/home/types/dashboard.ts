export interface DashboardStats {
  winningBetAmount: number;
  wonBetCount: number;
}

export interface MonthlyBetCount {
  month: string;
  count: number;
}

export interface SportDistribution {
  sport: string;
  percentage: number;
  color: string;
}
