import { create } from "zustand";

type contact = {
  name: string;
  username: string;
  ref: string;
  date: string;
};

type chat = {
  sender: string;
  receiver: string;
  date: string;
  text: string;
  id: number;
};

type zustand = {
  refresh: number;
  selectedContact: contact | null;
  Contacts: Array<contact>;
  AllChats: Array<chat>;
  setAllChats: (param: Array<chat>) => void;
  setContacts: (param: Array<contact>) => void;
  setSelectedContact: (param: contact | null) => void;
  setRefresh: () => void;
};

const Store = create<zustand>()((set) => ({
  Contacts: [],
  AllChats: [],
  refresh: 0,
  selectedContact: null,
  setSelectedContact: (param = null) => set(() => ({ selectedContact: param })),
  setContacts: (param = []) => set(() => ({ Contacts: param })),
  setAllChats: (param = []) => set(() => ({ AllChats: param })),
  setRefresh: () => set((state) => ({ refresh: state.refresh + 1 })),
}));

export default Store;
