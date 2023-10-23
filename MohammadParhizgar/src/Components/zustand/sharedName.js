import {create} from "zustand"

export const useName = create ((set)=>({
    sharedName : "",
    setSharedName : (value) => set(()=>({sharedName:value}))
}))