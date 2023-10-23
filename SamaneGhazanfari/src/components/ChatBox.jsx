import { useState } from "react";
import { useEffect } from "react";

function ChatBox() {

    const [chats, setChats] = useState([]);

    const fetchChat = async () => {
        const res = await (await fetch("https://farawin.iran.liara.run/api/chat", {
            method: "GET",
            headers: {
                authorization: `${localStorage.token}`
            }

        })).json();
        // console.log (res)
        const myChat = res.chatList
        setChats(myChat);
        console.log(myChat)
    };





    useEffect(() => {
        fetchChat()


    }, [])

    const sender = chats.filter((item) => {
        return item.sender == localStorage.username && item.receiver == '09333536546'
    })
    // console.log(sender)



     const reciver = chats.filter((i)=>{
        return i.sender == '09333536546' && i.reciver == localStorage.username
     })
     console.log(reciver)




    return (
        <div className="w-full flex bg-slate-300 flex-col rounded-xl">
            <li className=" flex flex-row m-2 cursor-pointer rounded-lg h-12">
                <div className="rounded-full h-10 w-10 flex justify-center items-center bg-slate-600 ">
                    ''
                </div>
                <span className="m-2">
                    name
                </span>
            </li>
            {/* chat box */}
            <div className=" flex flex-col h-full rounded-xl p-2 m-1 ">
                {/* sender */}
                {sender.map((i) => (
                    <div className="flex">
                        <div className="rounded-full h-10 w-10 flex justify-center items-center bg-slate-600 ">
                            ''
                        </div>
                        <div className="bg-slate-400 break-words m-1 flex flex-col rounded-2xl text-right p-1 w-[100px]">
                            <span className="text-xl" > me</span>
                            {i.sender == localStorage.username &&
                                <span> {i.text} </span>
                            }

                        </div>

                    </div>
                ))}


                {/* reciver */}
                
                    <div className="flex justify-end">
                        <div className="bg-slate-400 break-words m-1 flex flex-col rounded-2xl text-left p-1 w-[100px]">
                        <span className="text-xl" >reciver</span>
                            <span className="m-1"> hiiii </span>
                        
                        </div>
                        <div className="rounded-full self-end h-10 w-10 flex justify-center items-center bg-slate-600 ">
                            ''
                        </div>

                    </div>

                


            </div>

            <input
                className="h-12 bg-slate-200 rounded-xl p-1 outline-none m-2 w-30 "
                placeholder=" ... "
                type="text" />

        </div>
    )
}
export default ChatBox;