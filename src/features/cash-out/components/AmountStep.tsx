import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '../types/cash-out';

interface AmountStepProps {
  amount: number;
  maxAmount: number;
  onNext: (amount: number) => void;
  onBack: () => void;
}

const QUICK_AMOUNTS = [1000, 5000, 10000, 25000];

export function AmountStep({ amount, maxAmount, onNext, onBack }: AmountStepProps) {
  const [value, setValue] = useState(amount.toString());
  const [error, setError] = useState<string>();

  useEffect(() => {
    setValue(amount.toString());
  }, [amount]);

  const handleAmountChange = (inputValue: string) => {
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setValue(numericValue);
    setError(undefined);
  };

  const handleQuickAmount = (quickAmount: number) => {
    setValue(quickAmount.toString());
    setError(undefined);
  };

  const handleMax = () => {
    setValue(maxAmount.toString());
    setError(undefined);
  };

  const validate = (): boolean => {
    const numValue = parseFloat(value);

    if (!value.trim() || isNaN(numValue)) {
      setError('Please enter a valid amount');
      return false;
    }

    if (numValue <= 0) {
      setError('Amount must be greater than 0');
      return false;
    }

    if (numValue > maxAmount) {
      setError(`Amount cannot exceed ₱${formatCurrency(maxAmount)}`);
      return false;
    }

    return true;
  };

  const handleContinue = () => {
    if (validate()) {
      onNext(parseFloat(value));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Enter withdrawal amount</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Withdrawal Amount</label>
          <div className="relative">
            <Input
              type="text"
              value={value}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              leftIcon={<span className="text-muted-foreground font-medium">₱</span>}
              error={error}
              className="text-lg"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Available balance: ₱{formatCurrency(maxAmount)}
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground mb-3">Quick Select</p>
        <div className="grid grid-cols-3 gap-2">
          {QUICK_AMOUNTS.map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAmount(quickAmount)}
              disabled={quickAmount > maxAmount}
              className="text-sm"
            >
              {quickAmount >= 1000 ? `${quickAmount / 1000}K` : quickAmount}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleMax}
            className="text-sm"
          >
            Max
          </Button>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleContinue} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  );
}
