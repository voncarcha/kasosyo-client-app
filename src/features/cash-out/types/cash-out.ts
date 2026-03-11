export interface BankDetails {
  bankId: string;
  accountNumber: string;
  accountName: string;
}

export interface CashOutFormData {
  bankDetails: BankDetails;
  amount: number;
}

export const FEE_PERCENTAGE = 0.02;

export function calculateFee(amount: number): number {
  return amount * FEE_PERCENTAGE;
}

export function calculateTotalDeduction(amount: number): number {
  return amount + calculateFee(amount);
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
