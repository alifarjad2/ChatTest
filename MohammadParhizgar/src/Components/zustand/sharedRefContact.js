import {create} from "zustand"

export const useRefcontact = create ((set)=>({
    sharedRefcontact : "",
    setSharedRefcontact: (value) => set(()=>({sharedRefcontact:value}))
}))