import {create} from "zustand"

export const useNumber = create ((set)=>({
    sharedNumber : "",
    setSharedNumber : (value) => set(()=>({sharedNumber:value}))
}))