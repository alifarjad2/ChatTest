import Contacts from "./contacts";
import AddContact from "./addContact";
import { useState } from "react";
function Sidebar() {
  const [refreshContact, setRefreshContact] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  return (
    <>
      {showAddContact?  <AddContact setShowAddContact={setShowAddContact} /> : ""}
      <div className=" h-screen flex flex-col bg-orange-300">
        <header className="w-full h-14 bg-orange-500 flex gap-2">
          <div
            className="hover:cursor-pointer "
            onClick={() => setRefreshContact(true)}
          >
            {" "}
            refresh{" "}
          </div>
          <div
            className="hover:cursor-pointer "
            onClick={() => setShowAddContact(true)}
          >
            {" "}
            add{" "}
          </div>
        </header>
        <Contacts refreshContact={refreshContact} />
      </div>
    </>
  );
}
export default Sidebar;
