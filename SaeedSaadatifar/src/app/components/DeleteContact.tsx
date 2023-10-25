"use client";
import { useState, ChangeEvent } from "react";
import Store from "./zustand";

type prop = {
  setIsShowDelete: (param: boolean) => void;
  number: string | undefined;
};

const DeleteContact = ({ number, setIsShowDelete }: prop) => {
  const { setSelectedContact, setRefresh } = Store();
  return (
    <div
      onClick={(e) => {
        setIsShowDelete(false);
      }}
      className="absolute h-screen w-screen backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex shadow-black shadow-2xl drop-shadow-2xl px-14 relative gap-7 flex-col p-10 items-center bg-slate-600 rounded-2xl"
      >
        <div
          onClick={(e) => {
            setIsShowDelete(false);
          }}
          className="absolute hover:bg-slate-300 cursor-pointer top-3 left-3 border border-black p-2 rounded-full"
        >
          X
        </div>
        <p className="text-2xl font-bold">Delete Contact</p>
        <p className="text-sm font-semibold">
          Are You Want Delete This Contact?
        </p>
        <button
          onClick={() => {
            let body = { username: number };
            let a = JSON.stringify(body);
            console.log;
            fetch("https://farawin.iran.liara.run/api/contact", {
              headers: {
                authorization: `eyJ1c2VybmFtZSI6IjA5MTI1MTUxMzIyIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJTYWVlZCBTYWFkYXRpZmFyIiwiZGF0ZSI6IjIwMjMtMDgtMDlUMDg6MzY6MDEuMzU2WiJ9`,
              },
              body: a,
              method: "DELETE",
            }).then((res) =>
              res.json().then((r) => {
                alert(r.message);
                if (r.code == "200") {
                  setIsShowDelete(false);
                  setSelectedContact(null);
                  setRefresh();
                }
              })
            );
          }}
          className="w-full rounded-2xl py-2 hover:bg-slate-300 cursor-pointer border border-black"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteContact;
