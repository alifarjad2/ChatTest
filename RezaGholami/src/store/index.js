import { create } from "zustand";
export const useStore = create((set) => ({
  contactSelected: "",
  setContactSelected: (value) =>set((state) => ({ contactSelected: (state.contactSelected = value) })),
  chatData: "",
  setChatData: (value) =>set((state) => ({chatData:(state.chatData = value)})),
}));
