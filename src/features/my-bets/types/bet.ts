export type BetType = 'SINGLE' | 'MULTIPLE';

export type BetStatus = 'ACCEPTED' | 'CASHED_OUT' | 'WON' | 'LOST' | 'RETURNED';

export type BetFilter = 'ALL' | 'ACCEPTED' | 'CASHED_OUT' | 'WON' | 'LOST';

export interface Bet {
  id: string;
  type: BetType;
  status: BetStatus;
  dateTime: string;
  amount: number;
  odd: number;
  wonAmount?: number;
  selections: BetSelection[];
}

export interface BetSelection {
  id: string;
  event: string;
  market: string;
  selection: string;
  odd: number;
  result?: 'WON' | 'LOST' | 'PENDING';
}
