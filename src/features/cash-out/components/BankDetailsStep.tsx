import { useState, useEffect } from 'react';
import { IdentificationCardIcon, UserIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { BANKS } from '../data/banks';
import type { BankDetails } from '../types/cash-out';

interface BankDetailsStepProps {
  data: BankDetails;
  onNext: (data: BankDetails) => void;
  onBack: () => void;
}

interface BankDetailsErrors {
  bankId?: string;
  accountNumber?: string;
  accountName?: string;
}

export function BankDetailsStep({ data, onNext, onBack }: BankDetailsStepProps) {
  const [bankId, setBankId] = useState(data.bankId);
  const [accountNumber, setAccountNumber] = useState(data.accountNumber);
  const [accountName, setAccountName] = useState(data.accountName);
  const [errors, setErrors] = useState<BankDetailsErrors>({});

  useEffect(() => {
    setBankId(data.bankId);
    setAccountNumber(data.accountNumber);
    setAccountName(data.accountName);
  }, [data]);

  const validate = (): boolean => {
    const newErrors: BankDetailsErrors = {};

    if (!bankId) {
      newErrors.bankId = 'Please select a bank';
    }

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required';
    }

    if (!accountName.trim()) {
      newErrors.accountName = 'Account name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext({ bankId, accountNumber, accountName });
    }
  };

  const clearError = (field: keyof BankDetailsErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Select Bank</label>
        <Select
          value={bankId}
          onChange={(e) => {
            setBankId(e.target.value);
            clearError('bankId');
          }}
          error={errors.bankId}
        >
          <option value="">Choose a bank</option>
          {BANKS.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {bank.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Account Number</label>
        <Input
          type="text"
          value={accountNumber}
          onChange={(e) => {
            setAccountNumber(e.target.value);
            clearError('accountNumber');
          }}
          placeholder="Enter account number"
          leftIcon={<IdentificationCardIcon className="h-4 w-4" />}
          error={errors.accountNumber}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Account Name</label>
        <Input
          type="text"
          value={accountName}
          onChange={(e) => {
            setAccountName(e.target.value);
            clearError('accountName');
          }}
          placeholder="Enter account name"
          leftIcon={<UserIcon className="h-4 w-4" />}
          error={errors.accountName}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleNext} className="flex-1">
          Next
        </Button>
      </div>
    </div>
  );
}
