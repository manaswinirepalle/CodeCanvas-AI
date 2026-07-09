import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  terminalOpen: boolean;
  toggleSidebar: () => void;
  setTerminalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  terminalOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setTerminalOpen: (open) => set({ terminalOpen: open }),
}));
