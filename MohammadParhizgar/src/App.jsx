import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SideBar from "./Components/SideBar";
import ChatBox from "./Components/ChatBox";
import { useAdd } from "./Components/zustand/sharedAdd";
function App() {
  const setSharedAdd = useAdd((state) => state.setSharedAdd);
  const sharedAdd = useAdd((state) => state.sharedAdd);
  const [username2 ,setUsername]=useState('')
  const [name2 ,setName]=useState('')
  const [controlAdd,setControlAdd]=useState('')
  useEffect(()=>{
    async function Addcontact() {
      const body = JSON.stringify({
        username: username2,
        name: name2,
      });

      const response = await fetch("https://farawin.iran.liara.run/api/contact", {
        headers: {
          "Content-Type": "application/json",
          authorization:
            "eyJ1c2VybmFtZSI6IjA5MzY2MDM4ODU4IiwicGFzc3dvcmQiOiJtbWRyenBoemtyIiwibmFtZSI6IkZhcmF3aW4iLCJkYXRlIjoiMjAyMy0wNy0wN1QxNzo0MTo0OC4wMjZaIn0=",
        },
        body: body,
        method: "POST",
      });
    }

    if (controlAdd) {
      Addcontact();
    }
  },[controlAdd])
  console.log(sharedAdd);
  const handleUsername = (event)=>{
    setUsername(event.target.value)
  }
  const handlePassword = (event)=>{
    setName(event.target.value)
  }
  return (
    <div className="h-[100vh] p-5 w-screen flex justify-center align-middle">
      <div className="flex gap-5 p-2 bg-slate-400 h-full rounded-2xl w-full">
        <div className="h-full bg-slate-600 p-5 rounded-2xl">
          <SideBar />
        </div>
        <div className="w-full h-full">
          <ChatBox />
        </div>
        {!sharedAdd ? null :   (
          <div className="absolute top-0 left-0 bottom-0 right-0 w-screen h-screen backdrop-blur-md ">
            <div className=" flex h-full justify-center items-center">
              <div className="w-[250px] h-[255px] bg-green-400 rounded-lg ">
                <div className=" p-2 flex m-auto flex-col w-11/12 items-center gap-5">
                  <button
                    onClick={() => {
                      setSharedAdd(!sharedAdd)
                    }}
                    className="w-10/12 mt-1"
                  >
                    close
                  </button>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="mobile">شماره موبایل :</label>
                    <input
                      onChange={handleUsername}
                      className="rounded-lg p-[2px]"
                      type="text"
                      placeholder="شمارهموبایل"
                      name="mobile"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="mobile">نام مخاطب :</label>
                    <input
                    onChange={handlePassword}
                      className="rounded-lg p-[2px]"
                      type="text"
                      placeholder="شمارهموبایل"
                      name="mobile"
                    />
                  </div>
                  <button onClick={()=>{setControlAdd(Math.random())}} className="w-10/12">Add</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
