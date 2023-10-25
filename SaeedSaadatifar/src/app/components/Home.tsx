"use client";
import ChatPage from "./ChatPage";
import Sidebar from "./Sidebar";
import Store from "./zustand";
import { useEffect, useState } from "react";

type contact = {
  name: string;
  username: string;
  ref: string;
  date: string;
};
type chat = {
  sender: string;
  receiver: string;
  date: string;
  text: string;
  id: number;
};

const Home = () => {
  const { refresh, selectedContact, setContacts, setAllChats } = Store();
  useEffect(() => {
    fetch("https://farawin.iran.liara.run/api/contact", {
      headers: {
        authorization: `eyJ1c2VybmFtZSI6IjA5MTI1MTUxMzIyIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJTYWVlZCBTYWFkYXRpZmFyIiwiZGF0ZSI6IjIwMjMtMDgtMDlUMDg6MzY6MDEuMzU2WiJ9`,
      },
    }).then((result) =>
      result
        .json()
        .then((res) =>
          setContacts(
            res.contactList.filter(
              (contact: contact) => contact.ref == "09125151322"
            )
          )
        )
    );
    fetch("https://farawin.iran.liara.run/api/chat", {
      headers: {
        authorization: `eyJ1c2VybmFtZSI6IjA5MTI1MTUxMzIyIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJTYWVlZCBTYWFkYXRpZmFyIiwiZGF0ZSI6IjIwMjMtMDgtMDlUMDg6MzY6MDEuMzU2WiJ9`,
      },
      method: "GET",
    }).then((result) =>
      result.json().then((res) => {
        if (res.code == "200") {
          setAllChats(
            res.chatList
              .filter(
                (chat: chat) =>
                  chat.receiver == "09125151322" || chat.sender == "09125151322"
              )
              .sort((a: chat, b: chat) => +new Date(a.date) - +new Date(b.date))
          );
        }
      })
    );
  }, [refresh]);
  return (
    <div className="h-screen w-screen">
      <div className="flex w-full h-full">
        <Sidebar />
        {selectedContact && <ChatPage />}
      </div>
    </div>
  );
};

export default Home;
