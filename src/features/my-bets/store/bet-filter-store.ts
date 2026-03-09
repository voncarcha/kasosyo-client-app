import { create } from 'zustand';
import type { BetFilter } from '../types/bet';

interface BetFilterState {
  activeFilter: BetFilter;
  setFilter: (filter: BetFilter) => void;
}

export const useBetFilterStore = create<BetFilterState>((set) => ({
  activeFilter: 'ALL',
  setFilter: (filter) => set({ activeFilter: filter }),
}));
