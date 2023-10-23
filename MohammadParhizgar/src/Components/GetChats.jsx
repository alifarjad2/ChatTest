import React, { useEffect, useState } from "react";
import { useNumber } from "./zustand/sharedNumber";
import { useRefchat } from "./zustand/sharedRefChat";
import "../app.css";
import { useName } from "./zustand/sharedName";
export default function GetChats() {
  const sharedName = useName((state) => state.sharedName);
  const [chats, setChats] = useState([]);
  const sharedNumber = useNumber((state) => state.sharedNumber);
  const sharedRefChat = useRefchat((state) => state.sharedRefChat);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      async function getChats() {
        let response = await fetch("https://farawin.iran.liara.run/api/chat", {
          headers: {
            authorization:
              "eyJ1c2VybmFtZSI6IjA5MzY2MDM4ODU4IiwicGFzc3dvcmQiOiJtbWRyenBoemtyIiwibmFtZSI6IkZhcmF3aW4iLCJkYXRlIjoiMjAyMy0wNy0wN1QxNzo0MTo0OC4wMjZaIn0=",
          },
          body: null,
          method: "GET",
        });
        let data = await response.json();
        return data;
      }
      getChats().then((chat) => setChats(chat.chatList));
    }

    return () => {
      ignore = true;
    };
  }, [sharedRefChat]);

  let sender = chats.filter((chat) => {
    if (chat.sender === localStorage.username) {
      return chat.receiver === sharedNumber;
    }
  });
  let receiver = chats.filter((chat) => {
    if (chat.sender === sharedNumber) {
      return chat.receiver === localStorage.username;
    }
  });
  let sortedChats = [...sender, ...receiver];
  sortedChats.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  //   console.log(chats)
  let avatar = sharedName.slice(0, 2);
  return (
    <div>
      {!sortedChats ? (
        <p>empty</p>
      ) : (
        <div>
          {sortedChats.map((chat, index) => {
            const dateObj = new Date(chat.date);
            let hour = dateObj.getHours();
            let min = dateObj.getMinutes();
            let isSender = chat.sender === localStorage.username;
            return (
              <div
                className={`flex items-end gap-2 mt-3 ${
                  !isSender ? "direction" : "direction2"
                }`}
                key={index}
              >
                <div
                  className={`w-9 h-9 bg-purple-500 text-center p-1  ${
                    !isSender
                      ? " rounded-l-lg rounded-tr-lg "
                      : " rounded-r-lg rounded-tl-lg"
                  }`}
                >
                  {isSender ? <p>User</p> : <p>{avatar}</p>}
                </div>
                <div
                  className={`w-1/3 break-words bg-slate-200 p-2 ${
                    isSender
                      ? " rounded-l-lg rounded-tr-lg "
                      : " rounded-r-lg rounded-tl-lg"
                  }`}
                >
                  <p>{chat.text}</p>
                  <p
                    className={`flex ${
                      !isSender ? "flex-row" : "flex-row-reverse"
                    }`}
                  >
                    {hour > 9 ? <p>{hour}</p> : <p>0{hour}</p>}:
                    {min > 9 ? <p>{min}</p> : <p>0{min}</p>}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
