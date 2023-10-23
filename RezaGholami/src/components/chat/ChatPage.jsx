import ContactList from "./ContactList"
import ChatBox from "./ChatBox"
import {Outlet} from "react-router-dom"
localStorage.token = "eyJ1c2VybmFtZSI6IjA5MDAwMDAwMDAwIiwicGFzc3dvcmQiOiJ4eHh4eHh4eCIsIm5hbWUiOiJ4eHgiLCJkYXRlIjoiMjAyMy0wNy0wN1QxMjo1Nzo0MS42NjRaIn0"
localStorage.username = "09000000000"
const ChatPage = ()=>{
    return(
      <>
      <Outlet/>
         <div className="w-[90%] mx-auto flex rounded-md overflow-hidden">
           <div className="w-[30%] bg-gray-600 p-1">
              <div className="flex flex-col my-2">
               <ContactList/>
              </div>
           </div>
           <div className="w-[70%] bg-gray-400 p-1">
            <ChatBox/>
           </div>
           
         </div>
         </>
    )
}
export default ChatPage