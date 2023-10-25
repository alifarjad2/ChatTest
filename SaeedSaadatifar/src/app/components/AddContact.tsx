"use client";

import { useState, ChangeEvent } from "react";
import Store from "./zustand";

type prop = {
  setIsShowAdd: (param: boolean) => void;
  setRefresh: any;
};

const AddContact = ({ setIsShowAdd }: prop) => {
  const [name, setName] = useState<string>("");
  const { setRefresh } = Store();
  const [number, setNumber] = useState<string>("");
  return (
    <div
      onClick={(e) => {
        setIsShowAdd(false);
      }}
      className="absolute h-screen w-screen backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex shadow-black shadow-2xl drop-shadow-2xl px-14 relative gap-7 flex-col p-10 items-center bg-slate-600 rounded-2xl"
      >
        <div
          onClick={(e) => {
            setIsShowAdd(false);
          }}
          className="absolute hover:bg-slate-300 cursor-pointer top-3 left-3 border border-black p-2 rounded-full"
        >
          X
        </div>
        <p className="text-2xl font-bold">Add Contact</p>
        <div className="flex flex-col relative">
          <label
            className="absolute font-semibold bg-slate-600 top-[-13px] left-3 px-1"
            htmlFor="name"
          >
            Name :
          </label>
          <input
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            id="name"
            placeholder="Saeed"
            className="bg-slate-600 text-white text-xs placeholder:text-xs placeholder:text-slate-200 placeholder:opacity-60 border border-black p-3 rounded-xl focus:outline-none"
          />
        </div>
        <div className="flex flex-col relative">
          <label
            className="absolute font-semibold bg-slate-600 top-[-13px] left-3 px-1"
            htmlFor="number"
          >
            Number :
          </label>
          <input
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setNumber(e.target.value)
            }
            maxLength={11}
            id="number"
            placeholder="09000000000"
            className="bg-slate-600 text-white text-xs placeholder:text-xs placeholder:text-slate-200 placeholder:opacity-60 border border-black p-3 rounded-xl focus:outline-none"
          />
        </div>
        <button
          onClick={() => {
            fetch("https://farawin.iran.liara.run/api/contact", {
              headers: {
                authorization: `eyJ1c2VybmFtZSI6IjA5MTI1MTUxMzIyIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJTYWVlZCBTYWFkYXRpZmFyIiwiZGF0ZSI6IjIwMjMtMDgtMDlUMDg6MzY6MDEuMzU2WiJ9`,
              },
              body: `{\n "username":"${number}",\n "name":"${name}"\n}`,
              method: "POST",
            }).then((res) =>
              res.json().then((r) => {
                alert(r.message);
                if (r.code == "200") {
                  setIsShowAdd(false);
                  setRefresh();
                }
              })
            );
          }}
          className="w-full rounded-2xl mt-7 py-2 hover:bg-slate-300 cursor-pointer border border-black"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddContact;
