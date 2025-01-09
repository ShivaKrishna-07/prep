import { create } from 'zustand';

interface LoadingState {
  isLoadingYear: boolean;
  isLoadingBranch: boolean;
  isLoadingSubject: boolean;
  folders: any;
  setLoadingYear: (loading: boolean) => void;
  setLoadingBranch: (loading: boolean) => void;
  setLoadingSubject: (loading: boolean) => void;
  setFolders: (folders: any) => void;
}

const useLoadingStore = create<LoadingState>((set) => ({
  isLoadingYear: false,
  isLoadingBranch: false,
  isLoadingSubject: false,
  folders:[],
  setLoadingYear: (loading) => set({ isLoadingYear: loading }),
  setLoadingBranch: (loading) => set({ isLoadingBranch: loading }),
  setLoadingSubject: (loading) => set({ isLoadingSubject: loading }),
  setFolders: (folders) => set({folders: folders}),
}));

export default useLoadingStore;
