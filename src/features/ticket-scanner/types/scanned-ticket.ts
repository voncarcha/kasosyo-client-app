export interface ScannedTicket {
  id: string;
  raw_data: string;
  scanned_at: string;
}

export interface ScannerState {
  isOpen: boolean;
  isScanning: boolean;
  error: string | null;
  lastScanned: ScannedTicket | null;
}
