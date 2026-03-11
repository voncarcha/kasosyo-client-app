import { HouseIcon, GearIcon, UserIcon, TicketIcon, MoneyIcon, type IconProps } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: ComponentType<IconProps>;
}

export const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/home', icon: HouseIcon },
  { name: 'My Bets', href: '/my-bets', icon: TicketIcon },
  { name: 'Cash Out', href: '/cash-out', icon: MoneyIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'Settings', href: '/settings', icon: GearIcon },
];
