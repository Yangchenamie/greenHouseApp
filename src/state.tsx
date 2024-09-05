import create from "zustand";

export interface StoreState {
  userId: number | null;
  updateUserId: (newId: number) => void;
}

const userStore = create<StoreState>()((set) => ({
  userId: null,
  updateUserId: (newId: number) => set({ userId: newId }),
}));

export default userStore;
