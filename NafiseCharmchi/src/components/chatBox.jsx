import useStore from "./zustand";
import { useEffect } from "react";
function ChatBox() {
  const { allChats, setAllChats, infoChatter } = useStore();
  useEffect(() => {
    fetch("https://farawin.iran.liara.run/api/chat", {
      headers: {
        authorization:
          "eyJ1c2VybmFtZSI6IjA5MDM3NDYxMzQ5IiwicGFzc3dvcmQiOiJzYWVlZDc5ODMiLCJuYW1lIjoiRmFyYXdpbiIsImRhdGUiOiIyMDIzLTA3LTEyVDE0OjM4OjE5LjM5M1oifQ==",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) =>
        setAllChats(
          res.chatList.filter(
            (chat) =>
              chat.receiver == "09037461349" || chat.sender == "09037461349"
          )
        )
      );
  }, []);
  return (
    <>
      <div className=" h-screen bg-yellow-500 ">
        <div className="h-full overflow-scroll">
          {allChats?.map((item) => (
            <div key={item.index} className="w-full h-10 mb-4 bg-red-100 ">
              {item.text}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input type="text" />
        <button> send </button>
      </div>
    </>
  );
}
export default ChatBox;
