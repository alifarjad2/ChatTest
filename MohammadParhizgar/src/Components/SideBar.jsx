import React, { useState } from "react";
import GetContact from "./GetContact";
import { useRefcontact } from "./zustand/sharedRefContact";
import { useAdd } from "./zustand/sharedAdd";
export default function SideBar() {
  const setSharedRefcontact = useRefcontact(
    (state) => state.setSharedRefcontact
  );
  const setSharedAdd = useAdd((state) => state.setSharedAdd);
  const [popControl, setPopControl] = useState(false);
  const sharedAdd = useAdd((state) => state.sharedAdd);
  return (
    <div className="flex flex-col w-full h-full gap-5">
      <div className="flex gap-2">
        <button
          onClick={() => {
            setSharedRefcontact(Math.random());
          }}
          className="p-1"
        >
          REF
        </button>
        <button
          onClick={() => {
            setPopControl(!popControl);
            setSharedAdd(popControl);
          }}
          className="p-1"
        >
          Add
        </button>
      </div>
      <div className="w-full h-full overflow-y-scroll">
        <GetContact />
      </div>
    </div>
  );
}
