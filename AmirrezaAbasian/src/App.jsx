import farawin from "farawin";
import { useEffect, useState } from "react";
import ContactBox from "./components/ContactBox";

import SendIcon from "./assets/icons/SendIcon";
import LinkIcon from "./assets/icons/LinkIcon";
import ChatBox from "./components/ChatBox";

const App = () => {
  //#region states
  const [allContacts, setAllContacts] = useState([]);

 const [reload,setReload]=useState(false)
  const [userContacts, setUserContacts] = useState([]);
  // user personal contacts

  const [selectedUser, setSelectedUser] = useState("");
  // to show in the chat box / object --> name & username

  // const [selectedChats, setSelectedChats] = useState([]);
  // when clicked the contacts chat saves here

  const [message, setMessage] = useState("");
  // text that's going to be sent

  const [personChats, setPersonChats] = useState([]);
  // the logged in user all chats

  //#endregion

  const selectedChats = personChats.filter(
    (chat) => chat.receiver === selectedUser.userPhonenumber
  );

  const handleSend = () => {
    farawin.testAddChat(selectedUser.userPhonenumber, message);
    setMessage("");
    setReload(!reload)
  };
  const _username = JSON.parse(atob(localStorage.getItem("token")));
  const username = _username.username; // user phone number goes in the username state
  
  useEffect(() => {
    const getContacts = async () => {
      const response = await farawin.getContacts();
      const result = await response.contactList; // all the raw contacts --> result
      setAllContacts(result);
      // console.log(allContacts);
      const _userContacts = result.filter((row) => row.ref === username);
      setUserContacts(_userContacts);
      // console.log(userContacts);
    };

    const getAllChat = async () => {
      const response = await farawin.getChats();
      const allChats = response.chatList;
      // console.log(allChats);
      const personalChat = allChats.filter((chat) => chat.sender === username);
      setPersonChats(personalChat);
      // console.log(personChats);
    };
    getContacts();
    getAllChat();
  }, [reload]);

  // console.log(personChats);

  // console.log(selectedChats);
  return (
    <div className="flex h-[90%] my-4 w-5/6 bg-gray-700 rounded-xl">
      <div className="basis-1/3 bg-zinc-600 rounded-r-xl flex flex-col overflow-y-auto">
        <section className="bg-gray-700 rounded-tr-xl rounded-bl-xl">
          search
        </section>
        <div
          onClick={() => {
            // const contactChat = personChats.filter(
            //   (chat) => chat.receiver === selectedUser.userPhonenumber
            // );
            // setSelectedChats(contactChat)
          }}
          className="flex gap-y-2 flex-col mt-4"
        >
          {userContacts.map((row) => (
            <ContactBox
              key={row.name}
              name={row.name}
              setSelectedUser={setSelectedUser} // object --> name & username
              userPhonenumber={row.username}
            />
          ))}
        </div>
        <div>add Contact</div>
      </div>
      <div className="basis-2/3 bg-red-400 rounded-l-xl flex flex-col">
        <div className="bg-zinc-600 h-[10%] rounded-tl-xl flex items-center justify-between">
          <div className="mr-4">
            <span className="text-white">{selectedUser?.name}</span>
          </div>
          <div className="ml-4">edit</div>
        </div>
        <div className="bg-zinc-600 h-[80%]">
          <div>
            {selectedUser &&
              selectedChats.map((chat) => (
                <ChatBox key={chat.date} text={chat.text} date={chat.date} />
              ))}
          </div>
        </div>
        <div className="bg-slate-300 h-[10%] rounded-bl-xl">
          <section className="flex bg-zinc-600 h-full rounded-bl-xl">
            <div
              onClick={handleSend}
              className="basis-1/12 flex justify-center items-center cursor-pointer hover:invert"
            >
              {/* Button for send ↓↓ */}
              <SendIcon />
            </div>
            <div className="basis-10/12">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full focus:bg-zinc-500 rounded-xl transition-all text-white bg-zinc-600 h-full outline-none p-2"
                type="text"
              />
            </div>
            <div className="basis-1/12 flex items-center justify-center">
              <LinkIcon />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default App;
