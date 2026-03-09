import { House, Gear, User, Ticket, type IconProps } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

export interface NavigationItem {
  name: string;
  href: string;
  icon: ComponentType<IconProps>;
}

export const navigationItems: NavigationItem[] = [
  { name: 'Home', href: '/home', icon: House },
  { name: 'My Bets', href: '/my-bets', icon: Ticket },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Gear },
];
