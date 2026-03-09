import { useState, useEffect } from 'react';
import { Phone } from '@phosphor-icons/react';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PhoneChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (phone: string) => void;
  currentPhone: string | null;
}

function isValidPhone(phone: string): boolean {
  return /^\+?[\d\s\-()]{7,}$/.test(phone);
}

export function PhoneChangeModal({ isOpen, onClose, onConfirm, currentPhone }: PhoneChangeModalProps) {
  const [phone, setPhone] = useState(currentPhone || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPhone(currentPhone || '');
      setError('');
    }
  }, [isOpen, currentPhone]);

  const handleConfirm = () => {
    const trimmed = phone.trim();
    
    if (!trimmed) {
      setError('Phone number is required');
      return;
    }
    
    if (!isValidPhone(trimmed)) {
      setError('Please enter a valid phone number');
      return;
    }
    
    onConfirm(trimmed);
    setPhone('');
    setError('');
  };

  const handleClose = () => {
    setPhone(currentPhone || '');
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={handleClose} title="Change Phone Number">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">New Phone Number</label>
          <Input
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setError('');
            }}
            placeholder="+1 (555) 123-4567"
            leftIcon={<Phone className="h-4 w-4" />}
            error={error}
          />
        </div>

        {currentPhone && (
          <p className="text-xs text-muted-foreground">
            Current: {currentPhone}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!phone.trim()}
            className="flex-1"
          >
            Confirm
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
