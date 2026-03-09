import { create } from 'zustand';
import type { ScannerState, ScannedTicket } from '../types/scanned-ticket';

interface TicketScannerActions {
  openScanner: () => void;
  closeScanner: () => void;
  setScanning: (isScanning: boolean) => void;
  setError: (error: string | null) => void;
  setScannedTicket: (ticket: ScannedTicket | null) => void;
  reset: () => void;
}

const initialState: ScannerState = {
  isOpen: false,
  isScanning: false,
  error: null,
  lastScanned: null,
};

export const useTicketScannerStore = create<ScannerState & TicketScannerActions>((set) => ({
  ...initialState,

  openScanner: () => set({ isOpen: true, error: null }),
  closeScanner: () => set({ isOpen: false, isScanning: false }),
  setScanning: (isScanning) => set({ isScanning }),
  setError: (error) => set({ error }),
  setScannedTicket: (ticket) => set({ lastScanned: ticket, isScanning: false }),
  reset: () => set(initialState),
}));
