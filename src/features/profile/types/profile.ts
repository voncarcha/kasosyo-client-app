export type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  points: number;
  membershipTier: MembershipTier;
}

export function getUserInitials(user: User): string {
  const first = user.firstName?.trim().charAt(0) ?? '';
  const last = user.lastName?.trim().charAt(0) ?? '';
  return `${first}${last}`.toUpperCase() || '?';
}

export function getMembershipTierColor(tier: MembershipTier): string {
  const colors: Record<MembershipTier, string> = {
    bronze: 'bg-amber-700 text-white',
    silver: 'bg-gray-400 text-gray-900',
    gold: 'bg-yellow-500 text-yellow-900',
    platinum: 'bg-purple-600 text-white',
  };
  return colors[tier];
}

export function getMembershipTierLabel(tier: MembershipTier): string {
  const labels: Record<MembershipTier, string> = {
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
  };
  return labels[tier];
}
