import { useState } from "react"
import { useStore } from "../../store"
import BoxMessage from "./BoxMessage"
import {FaUserMinus,FaUserEdit , FaLocationArrow} from "react-icons/fa"
import {Link} from "react-router-dom"
const ChatBox = () => {
const {contactSelected} = useStore()
const [inputSendMessage,SetInputSendMessage] = useState()
const handleInputSendMessage =(e)=>{
SetInputSendMessage(e.target.value)
}
const sendChat = async()=>{
   try{
    const response =await fetch("https://farawin.iran.liara.run/api/chat", {
      "headers": {
        "authorization":localStorage.token,
      },
      "referrer": "https://farawin.iran.liara.run/doc/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body":JSON.stringify({contactUsername:contactSelected.username ,textHtml:inputSendMessage }),
      "method": "POST",
    });
    if(response.status=="200")alert("پیام ارسال شد")
    else alert("پیام ارسال نشد")
   }catch(error){
      console.log(error)
   }
   SetInputSendMessage("")
}
    return (
        <>
            <div className="w-full h-full">
                <div className=" flex flex-col h-full gap-1">
                    <div className="h-10 flex justify-between">
                       <h3 className="text-lg text-white mr-2">
                         {contactSelected ? contactSelected.name: "مخاطب خود را انتخاب کنید"}
                       </h3>
                       <div className="flex gap-1">
                         <Link to={"/chat/editContact"} className="flex justify-center items-center bg-gray-400 w-14 rounded-2xl">
                         <FaUserEdit  className="w-6 h-6"/>
                         </Link>
                         <Link to={"/chat/deleteContact"} className=" flex justify-center items-center bg-gray-400 w-14 rounded-2xl">
                         <FaUserMinus  className="w-6 h-6"/>
                         </Link>
                       </div>
                    </div>
                    <div className="flex-grow relative">
                       <BoxMessage/>
                    </div>
                    <div className="flex w-auto transition-all rounded-2xl px-4 py-2 bg-gray-600 m-2">
                  <input
                    type="text"
                    value={inputSendMessage}
                    onInput={handleInputSendMessage}
                    disabled={!contactSelected}
                    className="bg-transparent text-white placeholder:text-base outline-none ml-2 w-full"
                    placeholder="پیام خود را بنویسید ..."
                  />
                  <FaLocationArrow
                    className=" w-6 h-6 rotate-[225deg] text-black cursor-pointer"
                    onClick={sendChat}
                  />
                </div>
                </div>
            </div>

        </>
    )
}
export default ChatBox