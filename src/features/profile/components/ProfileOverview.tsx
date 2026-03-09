import { CoinIcon } from '@phosphor-icons/react';
import type { User } from '../types/profile';
import { getUserInitials, getMembershipTierColor, getMembershipTierLabel } from '../types/profile';

interface ProfileOverviewProps {
  user: User;
}

export function ProfileOverview({ user }: ProfileOverviewProps) {
  const initials = getUserInitials(user);
  const tierColor = getMembershipTierColor(user.membershipTier);
  const tierLabel = getMembershipTierLabel(user.membershipTier);

  return (
    <div className="border border-border rounded-lg p-6 bg-card">
      <div className="flex flex-col items-center">
        <div className="h-24 w-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mb-4">
          {initials}
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-1">
          {user.firstName} {user.lastName}
        </h2>

        <span className={`text-xs font-medium px-3 py-1 rounded-full mb-4 ${tierColor}`}>
          {tierLabel} Member
        </span>

        <div className="flex items-center gap-2">
          <CoinIcon className="h-5 w-5 text-primary" weight="fill" />
          <span className="text-2xl font-bold text-foreground">
            {user.points.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">points</span>
        </div>
      </div>
    </div>
  );
}
