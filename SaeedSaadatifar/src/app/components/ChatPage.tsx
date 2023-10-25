"use client";
import Chats from "./Chats";
import DeleteContact from "./DeleteContact";
import EditPage from "./EditPage";
import Store from "./zustand";
import { useState, useRef, ChangeEvent } from "react";

const ChatPage = () => {
  const { setRefresh, selectedContact, setSelectedContact } = Store();
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);
  const [sendInp, setSendInp] = useState<string>("");
  const ref = useRef<any>();
  return (
    <>
      {isShowEdit && (
        <EditPage
          number={selectedContact?.username}
          setIsShowEdit={setIsShowEdit}
          nam={selectedContact?.name}
        />
      )}
      {isShowDelete && (
        <DeleteContact
          number={selectedContact?.username}
          setIsShowDelete={setIsShowDelete}
        />
      )}
      <div className="grow p-3 bg-blue-300 flex flex-col">
        <div className="bg-green-500 gap-3 rounded-xl flex p-3">
          <div
            onClick={(e) => {
              setSelectedContact(null);
            }}
            className="p-3 cursor-pointer hover:bg-slate-300 rounded-xl border border-black"
          >
            Back
          </div>
          <div className="flex gap-3 grow">
            <div className="flex grow items-center text-xl font-semibold">
              {selectedContact?.name}
            </div>
            <div
              onClick={() => {
                setIsShowEdit(true);
              }}
              className="p-2 cursor-pointer hover:bg-slate-300  px-4 flex items-center text-xs rounded-xl border border-black"
            >
              Edit
            </div>
            <div
              onClick={() => setIsShowDelete(true)}
              className="p-2 cursor-pointer hover:bg-slate-300 flex items-center text-xs rounded-xl border border-black"
            >
              Delete
            </div>
            <div
              onClick={() => setRefresh()}
              className="p-2 cursor-pointer hover:bg-slate-300 flex items-center text-xs rounded-xl border border-black"
            >
              Refresh
            </div>
          </div>
        </div>
        <Chats />
        <div className="bg-green-500 gap-3 rounded-xl flex p-3">
          <input
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setSendInp(e.target.value)
            }
            ref={ref}
            placeholder="Message"
            className="grow p-1 text-white placeholder:opacity-50 placeholder:text-white bg-green-500 focus:outline-none"
          />
          <div
            onClick={() => {
              let body = JSON.stringify({
                contactUsername: selectedContact?.username,
                textHtml: sendInp,
              });
              fetch("https://farawin.iran.liara.run/api/chat", {
                headers: {
                  authorization: `eyJ1c2VybmFtZSI6IjA5MTI1MTUxMzIyIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJTYWVlZCBTYWFkYXRpZmFyIiwiZGF0ZSI6IjIwMjMtMDgtMDlUMDg6MzY6MDEuMzU2WiJ9`,
                },
                body: body,
                method: "POST",
              }).then((result) =>
                result.json().then((res) => {
                  if (res.code == "200") {
                    ref.current.value = "";
                    setRefresh();
                  }
                })
              );
            }}
            className="p-2 cursor-pointer hover:bg-slate-300  px-4 flex items-center text-xs rounded-xl border border-black"
          >
            Send
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
