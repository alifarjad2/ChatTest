import {create} from "zustand"

export const useAdd = create ((set)=>({
    sharedAdd : false,
    setSharedAdd: (value) => set(()=>({sharedAdd:value}))
}))