"use client";
import { useRef, useEffect } from "react";
import Store from "./zustand";

type chat = {
  sender: string;
  receiver: string;
  date: string;
  text: string;
  id: number;
};

const AllChats = () => {
  const { AllChats, selectedContact } = Store();
  const ref = useRef<any>();
  useEffect(() => {
    ref.current &&
      (ref.current.scrollTop =
        ref.current.scrollHeight - ref.current.clientHeight);
  }, [AllChats, selectedContact]);
  return (
    <div
      ref={ref}
      className={`flex overflow-y-auto grow gap-2 p-2 flex-col ${
        AllChats.filter(
          (chats: chat) =>
            chats.receiver == selectedContact?.username ||
            chats.sender == selectedContact?.username
        ).length > 0
          ? ""
          : "justify-center items-center"
      }`}
    >
      {AllChats.filter(
        (chats: chat) =>
          chats.receiver == selectedContact?.username ||
          chats.sender == selectedContact?.username
      ).length > 0
        ? AllChats.filter(
            (chats: chat) =>
              chats.receiver == selectedContact?.username ||
              chats.sender == selectedContact?.username
          ).map((chat) => (
            <div
              key={chat.id}
              className={`p-2 ${
                chat.receiver == "09125151322" ? "self-start" : "self-end"
              } w-64 border break-words border-black rounded-2xl`}
            >
              <div className="text-lg font-semibold">{chat.text}</div>
              <div className="text-end text-xs font-semibold">
                {new Date(chat.date).toLocaleString("fa-ir")}
              </div>
            </div>
          ))
        : "No Message"}
    </div>
  );
};

export default AllChats;
