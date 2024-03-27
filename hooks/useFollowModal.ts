import { create } from "zustand";

interface FollowModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  defaultTab: string;
  setDefaultTab: (tabName: string) => void; 
}

const useFollowModal = create<FollowModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  defaultTab: '', 
  setDefaultTab: (tabName: string) => set({ defaultTab: tabName }),
}));
export default useFollowModal;
