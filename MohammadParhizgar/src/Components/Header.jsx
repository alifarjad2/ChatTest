import React, { useState } from "react";
import { useName } from "./zustand/sharedName";
import { useRefchat } from "./zustand/sharedRefChat";
export default function Header(){
    const sharedName=useName((state)=>state.sharedName)
    const setsharedRefChat = useRefchat((state)=>state.setsharedRefChat)
    return(
        <div className="flex w-full">
            <div className="flex flex-1 gap-2 items-center">
                <div className="w-10 h-10 bg-purple-400 rounded-xl text-center p-1">{sharedName.slice(0,2)}</div>
                <div>{
                    !sharedName? ( <p>empty</p> ) : ( <p>{sharedName}</p> )
                    }</div>
            </div>
            <div className="flex gap-1">
                <button onClick={()=>{setsharedRefChat(Math.random())}} className="p-1">REF</button>
                <button className="p-1">Edit</button>
            </div>
        </div>
    )
}