import { PlusIcon } from '@phosphor-icons/react';
import { useTicketScannerStore } from '../store/ticket-scanner-store';
import { cn } from '@/lib/utils/cn';

export function FloatingButton() {
  const openScanner = useTicketScannerStore((state) => state.openScanner);

  return (
    <button
      onClick={openScanner}
      className={cn(
        'fixed bottom-24 right-4 z-40',
        'flex items-center justify-center w-14 h-14 rounded-full',
        'bg-primary text-primary-foreground shadow-lg',
        'hover:bg-primary/90 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        'lg:bottom-6 lg:w-auto lg:h-auto lg:px-4 lg:py-3 lg:gap-2'
      )}
      aria-label="Add Ticket"
    >
      <PlusIcon className="h-6 w-6" weight="bold" />
      <span className="hidden lg:inline text-sm font-medium">Add Ticket</span>
    </button>
  );
}
