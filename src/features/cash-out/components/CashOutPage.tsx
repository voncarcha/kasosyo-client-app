import { useState } from 'react';
import { useToast } from '@/components/ui/toast';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { StepIndicator } from './StepIndicator';
import { BankDetailsStep } from './BankDetailsStep';
import { AmountStep } from './AmountStep';
import { ReviewStep } from './ReviewStep';
import type { BankDetails, CashOutFormData } from '../types/cash-out';

const STEPS = [
  { number: 1, label: 'Bank Details' },
  { number: 2, label: 'Amount' },
  { number: 3, label: 'Review' },
];

const INITIAL_FORM_DATA: CashOutFormData = {
  bankDetails: {
    bankId: '',
    accountNumber: '',
    accountName: '',
  },
  amount: 0,
};

export function CashOutPage() {
  const { addToast } = useToast();
  const { user } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CashOutFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxAmount = 10120;

  const handleBankDetailsNext = (bankDetails: BankDetails) => {
    setFormData((prev) => ({ ...prev, bankDetails }));
    setCurrentStep(2);
  };

  const handleAmountNext = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount }));
    setCurrentStep(3);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      addToast('success', 'Cash-out request submitted successfully!');
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
    } catch {
      addToast('error', 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="sticky top-0 bg-background border-b border-border z-10 py-4">
        <div className="max-w-lg mx-auto w-full px-4">
          <StepIndicator steps={STEPS} currentStep={currentStep} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4 max-w-lg mx-auto w-full">
          {currentStep === 1 && (
            <BankDetailsStep
              data={formData.bankDetails}
              onNext={handleBankDetailsNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 2 && (
            <AmountStep
              amount={formData.amount}
              maxAmount={maxAmount}
              onNext={handleAmountNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && user && (
            <ReviewStep
              formData={formData}
              user={user}
              onSubmit={handleSubmit}
              onBack={handleBack}
              isLoading={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
}
