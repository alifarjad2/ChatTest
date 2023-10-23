import ChatBox from "./components/ChatBox";
import Sidebar from "./components/sideBar";
import AddContact from "./components/AddContact";

import React, { useState, useEffect } from "react";

export default function App() {
  const [contact, setContact] = useState([]);
  const [refreshContact, setRefreshContact] = useState(false);
  const [refreshChats, setRefreshChats] = useState(false);
  const [selectedcontact, setSelectedContact] = useState(null);
  const [chats, setChats] = useState([]);
  const [sender, setSender] = useState([]);
  const [receiver, setReceiver] = useState([]);
  const [openAdd, setOpenAdd] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch(
        "https://farawin.iran.liara.run/api/contact",
        {
          headers: {
            authorization:
              "eyJ1c2VybmFtZSI6IjA5MzA1MzIwOTEwIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJtb2hhbW1tYWQgZ2hvcmJhbmkiLCJkYXRlIjoiMjAyMy0wOC0xMFQxNzo1Mzo0OS4wNjdaIn0=",
          },
          referrer: "https://farawin.iran.liara.run/doc/",
          method: "GET",
        }
      );
      const data = await response.json();
      setContact(data.contactList);
      localStorage.setItem(
        "token",
        "eyJ1c2VybmFtZSI6IjA5MzA1MzIwOTEwIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJtb2hhbW1tYWQgZ2hvcmJhbmkiLCJkYXRlIjoiMjAyMy0wOC0xMFQxNzo1Mzo0OS4wNjdaIn0="
      );
      localStorage.setItem("username", "09305320910");
    };
    fetchContacts();
  }, [refreshContact]);

  useEffect(() => {
    const getChats = async () => {
      const response = await fetch("https://farawin.iran.liara.run/api/chat", {
        headers: {
          authorization:
            "eyJ1c2VybmFtZSI6IjA5MzA1MzIwOTEwIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJtb2hhbW1tYWQgZ2hvcmJhbmkiLCJkYXRlIjoiMjAyMy0wOC0xMFQxNzo1Mzo0OS4wNjdaIn0=",
        },

        method: "GET",
      });
      const data = await response.json();
      setChats(data);
    };
    getChats();
    filterChats();
  }, [refreshChats]);

  const filteredContacts = contact?.filter(
    (contact) => contact.ref === localStorage.getItem("username")
  );
  const handleRefreshChats = () => {
    setRefreshChats(!refreshChats);
  };

  const handleRefreshContact = () => {
    setRefreshContact(!refreshContact);
  };

  const filterChats = () => {
    return chats?.chatList;
  };

  return (
    <div className="w-screen h-screen p-5">
      <div className="w-full h-full flex  ">
        <Sidebar
          handleRefreshContact={handleRefreshContact}
          filteredContacts={filteredContacts}
          setSelectedContact={setSelectedContact}
          setOpenAdd={setOpenAdd}
        />
        <ChatBox
          selectedcontact={selectedcontact}
          handleRefreshChats={handleRefreshChats}
          // sender={sender}
          // receiver={receiver}
          chats={filterChats}
        />
        <AddContact openAdd={openAdd} setOpenAdd={setOpenAdd} />
      </div>
    </div>
  );
}
