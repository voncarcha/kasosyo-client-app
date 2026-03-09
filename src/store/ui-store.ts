import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type TimeFormat = '12h' | '24h';

interface UIState {
  theme: Theme;
  timeFormat: TimeFormat;
  sidebarExpanded: boolean;
  mobileSidebarOpen: boolean;
  setTheme: (theme: Theme) => void;
  setTimeFormat: (format: TimeFormat) => void;
  toggleSidebar: () => void;
  setMobileSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      timeFormat: '12h',
      sidebarExpanded: true,
      mobileSidebarOpen: false,
      setTheme: (theme) => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        set({ theme });
      },
      setTimeFormat: (timeFormat) => set({ timeFormat }),
      toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
    }),
    {
      name: 'ui-storage',
    },
  ),
);
