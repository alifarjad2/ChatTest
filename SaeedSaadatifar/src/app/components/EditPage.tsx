"use client";
import { useState, ChangeEvent } from "react";
import Store from "./zustand";

type prop = {
  setIsShowEdit: (param: boolean) => void;
  number: string | undefined;
  nam: string | undefined;
};

const EditPage = ({ nam, number, setIsShowEdit }: prop) => {
  const [name, setName] = useState<string | undefined>(nam);
  const { setRefresh } = Store();
  return (
    <div
      onClick={(e) => {
        setIsShowEdit(false);
      }}
      className="absolute h-screen w-screen backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex shadow-black shadow-2xl drop-shadow-2xl px-14 relative gap-7 flex-col p-10 items-center bg-slate-600 rounded-2xl"
      >
        <div
          onClick={(e) => {
            setIsShowEdit(false);
          }}
          className="absolute hover:bg-slate-300 cursor-pointer top-3 left-3 border border-black p-2 rounded-full"
        >
          X
        </div>
        <p className="text-2xl font-bold">Edit Contact</p>
        <div className="flex flex-col relative">
          <label
            className="absolute font-semibold bg-slate-600 top-[-13px] left-3 px-1"
            htmlFor="name"
          >
            Name :
          </label>
          <input
            value={name}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            id="name"
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
            disabled
            value={number}
            id="number"
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
              method: "PUT",
            }).then((res) =>
              res.json().then((r) => {
                alert(r.message);
                if (r.code == "200") {
                  setIsShowEdit(false);
                  setRefresh();
                }
              })
            );
          }}
          className="w-full rounded-2xl mt-7 py-2 hover:bg-slate-300 cursor-pointer border border-black"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditPage;
