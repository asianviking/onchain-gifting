import { create } from "zustand"

interface ModalState {
    createGiftDialogOpen: boolean
    setCreateGiftDialogOpen: (createGiftDialogOpen: boolean) => void
}

export const useModal = create<ModalState>((set) => ({
  createGiftDialogOpen: false,
  setCreateGiftDialogOpen: (createGiftDialogOpen: boolean) => set({ createGiftDialogOpen }),
}))
