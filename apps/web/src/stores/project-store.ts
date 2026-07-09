import { create } from 'zustand';

interface ProjectState {
  currentProjectId: string | null;
  currentFileId: string | null;
  isDirty: boolean;
  setCurrentProject: (id: string) => void;
  setCurrentFile: (id: string) => void;
  setDirty: (dirty: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProjectId: null,
  currentFileId: null,
  isDirty: false,
  setCurrentProject: (id) => set({ currentProjectId: id }),
  setCurrentFile: (id) => set({ currentFileId: id }),
  setDirty: (dirty) => set({ isDirty: dirty }),
}));
