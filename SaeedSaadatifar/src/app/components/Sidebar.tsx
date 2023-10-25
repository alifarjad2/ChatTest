"use client";
import { useState } from "react";
import Store from "./zustand";
import Contacts from "./Contacts";
import AddContact from "./AddContact";

const Sidebar = () => {
  const { setRefresh } = Store();
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);

  return (
    <>
      {isShowAdd && (
        <AddContact setIsShowAdd={setIsShowAdd} setRefresh={setRefresh} />
      )}
      <div className="w-1/3 p-3 bg-red-400 h-screen flex flex-col">
        <div className=" flex border-b pb-3 w-full">
          <div className="text-2xl grow my-auto font-bold ">Farawin</div>
          <div className="flex gap-3">
            <div
              onClick={() => setRefresh()}
              className="p-2 border border-black rounded-xl hover:bg-slate-300 cursor-pointer"
            >
              Ref
            </div>
            <div
              onClick={() => setIsShowAdd(true)}
              className="p-2 border border-black rounded-xl hover:bg-slate-300 cursor-pointer"
            >
              Add
            </div>
          </div>
        </div>
        <Contacts />
      </div>
    </>
  );
};

export default Sidebar;
