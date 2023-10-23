import { create } from "zustand";

const useStore = create((set) => ({
  contacts: [],
  setContacts: (param) => set(() => ({ contacts: param })),
  allChats: [],
  setAllChats: (param) => set(() => ({ allChats: param })),
  infoChatter:"",
  setInfoChatter : (param)=> set(()=>({allChats: param  })),
}));

export default useStore;
