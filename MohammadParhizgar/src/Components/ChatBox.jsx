import React from "react";
import Header from "./Header";
import GetChats from "./GetChats";
import ChatSender from "./ChatSender";
export default function ChatBox(){

    return(
        <div className="flex flex-col gap-5 w-full h-full">
            <div className="w-full"><Header/></div>
            <div className="w-full flex-1 h-3/4 overflow-y-scroll"><GetChats/></div>
            <div className="w-full"><ChatSender/></div>
        </div>
    )
}