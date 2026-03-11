import { Button } from '@/components/ui/button';
import { getBankById } from '../data/banks';
import { formatCurrency, calculateFee, calculateTotalDeduction, FEE_PERCENTAGE } from '../types/cash-out';
import type { CashOutFormData } from '../types/cash-out';
import type { User } from '@/features/profile/types/profile';
import { getMembershipTierLabel } from '@/features/profile/types/profile';

interface ReviewStepProps {
  formData: CashOutFormData;
  user: User;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

const OPERATOR_NAME = 'Kasosyo Gaming';
const OPERATOR_GROUP = 'Premium Operators';

export function ReviewStep({ formData, user, onSubmit, onBack, isLoading }: ReviewStepProps) {
  const bank = getBankById(formData.bankDetails.bankId);
  const fee = calculateFee(formData.amount);
  const totalDeduction = calculateTotalDeduction(formData.amount);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Review Cash-Out</h3>

      <div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
        <div className="p-4 bg-muted/30">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Account Information
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Account ID</span>
              <span className="text-sm font-medium text-foreground">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Account Type</span>
              <span className="text-sm font-medium text-foreground">
                {getMembershipTierLabel(user.membershipTier)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/30">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Operator Information
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Operator Name</span>
              <span className="text-sm font-medium text-foreground">{OPERATOR_NAME}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Operator Group</span>
              <span className="text-sm font-medium text-foreground">{OPERATOR_GROUP}</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/30">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Bank Information
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Bank Name</span>
              <span className="text-sm font-medium text-foreground">{bank?.name || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Account Number</span>
              <span className="text-sm font-medium text-foreground font-mono">
                {formData.bankDetails.accountNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Account Name</span>
              <span className="text-sm font-medium text-foreground">
                {formData.bankDetails.accountName}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted/30">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Transaction Summary
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Withdraw Amount</span>
              <span className="text-sm font-medium text-foreground">
                ₱{formatCurrency(formData.amount)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Fee ({(FEE_PERCENTAGE * 100).toFixed(0)}%)
              </span>
              <span className="text-sm font-medium text-foreground">
                ₱{formatCurrency(fee)}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-border">
              <span className="text-sm font-medium text-foreground">Total Deduction</span>
              <span className="text-base font-semibold text-foreground">
                ₱{formatCurrency(totalDeduction)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={isLoading}>
          Back
        </Button>
        <Button onClick={onSubmit} className="flex-1" isLoading={isLoading}>
          Submit Request
        </Button>
      </div>
    </div>
  );
}
