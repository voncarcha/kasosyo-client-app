import { useEffect, useRef, useCallback } from 'react';
import { X, Camera, Spinner } from '@phosphor-icons/react';
import { Html5Qrcode } from 'html5-qrcode';
import { useTicketScannerStore } from '../store/ticket-scanner-store';
import { cn } from '@/lib/utils/cn';

const SCANNER_ID = 'qr-scanner';

export function QRScannerModal() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const { isOpen, isScanning, error, closeScanner, setScanning, setError, setScannedTicket } =
    useTicketScannerStore();

  const stopScanner = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch {
        // Scanner might already be stopped
      }
      scannerRef.current = null;
    }
  }, []);

  const startScanner = useCallback(async () => {
    if (scannerRef.current) return;

    try {
      setScanning(true);
      setError(null);

      scannerRef.current = new Html5Qrcode(SCANNER_ID);

      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScannedTicket({
            id: crypto.randomUUID(),
            raw_data: decodedText,
            scanned_at: new Date().toISOString(),
          });
          stopScanner();
          closeScanner();
        },
        () => {}
      );
    } catch {
      setError('Failed to access camera. Please ensure camera permissions are granted.');
      setScanning(false);
    }
  }, [closeScanner, setScanning, setError, setScannedTicket, stopScanner]);

  useEffect(() => {
    if (isOpen) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen, startScanner, stopScanner]);

  const handleClose = async () => {
    await stopScanner();
    closeScanner();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/60 z-50 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={handleClose}
      />

      <div
        className={cn(
          'fixed inset-x-4 top-1/2 -translate-y-1/2 z-50',
          'bg-card rounded-2xl overflow-hidden shadow-2xl',
          'transition-all duration-300',
          'max-w-md mx-auto'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" weight="fill" />
            <h3 className="text-lg font-semibold text-foreground">Scan Ticket QR Code</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close scanner"
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-4">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <div
            id={SCANNER_ID}
            className={cn(
              'w-full aspect-square rounded-lg overflow-hidden bg-muted',
              'border-2 border-dashed border-border'
            )}
          />

          {isScanning && (
            <div className="mt-4 flex items-center justify-center gap-2 text-muted-foreground">
              <Spinner className="h-4 w-4 animate-spin" />
              <span className="text-sm">Scanning...</span>
            </div>
          )}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Position the QR code within the frame to scan your ticket
          </p>
        </div>
      </div>
    </>
  );
}
