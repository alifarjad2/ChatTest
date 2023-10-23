import ChatBox from "./ChatBox";
import SideBar from "./SideBar";

function Messenger() {
    localStorage.username = '09154889814' ;
    localStorage.token = 'eyJ1c2VybmFtZSI6IjA5MTU0ODg5ODE0IiwicGFzc3dvcmQiOiJzYW1hbmVnaGF6YW5mYXJpIiwibmFtZSI6IkZhcmF3aW4iLCJkYXRlIjoiMjAyMy0wNy0wOFQwODozMDowMC44MDFaIn0'


    return(
        <div className=" w-screen flex bg-slate-300 rounded-xl">
            <SideBar />
            <ChatBox />
        </div>
    )
}
export default Messenger ;