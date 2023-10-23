import {create} from "zustand"

export const useRefchat = create ((set)=>({
    sharedRefChat : "",
    setsharedRefChat: (value) => set(()=>({sharedRefChat:value}))
}))