import React, { useEffect, useState } from "react";
import { useName } from "./zustand/sharedName";
import { useNumber } from "./zustand/sharedNumber";
import { useRefcontact } from "./zustand/sharedRefContact";
export default function GetContact() {
  const [filteredContact, setFilteredContact] = useState([]);
  const setSharedName = useName((state) => state.setSharedName);
  const setSharedNumber = useNumber((state) => state.setSharedNumber);
  const sharedRefcontact = useRefcontact((state) => state.sharedRefcontact);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      async function contacts() {
        const response = await fetch(
          "https://farawin.iran.liara.run/api/contact",
          {
            headers: {
              authorization:
                "eyJ1c2VybmFtZSI6IjA5MzY2MDM4ODU4IiwicGFzc3dvcmQiOiJtbWRyenBoemtyIiwibmFtZSI6IkZhcmF3aW4iLCJkYXRlIjoiMjAyMy0wNy0wN1QxNzo0MTo0OC4wMjZaIn0=",
            },
            body: null,
            method: "GET",
          }
        );
        let data = await response.json();
        return data;
      }
      contacts().then((contact) =>
        setFilteredContact(
          contact.contactList.filter((res) => res.ref === localStorage.username)
        )
      );
    }
    console.log(filteredContact);
    console.log(sharedRefcontact)
    return () => {
      ignore = true;
    };
  }, [sharedRefcontact]);
  let contacts = filteredContact;

  return (
    <div className=" flex flex-col items-center w-full">
      {
        (contacts = "" ? (
          <h1>لیست خالی است !!!</h1>
        ) : (
          filteredContact.map((contact, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSharedName(contact.name),
                    setSharedNumber(contact.username);
                }}
                className="flex flex-col gap-2 mt-2 cursor-pointer hover:bg-purple-300 rounded-xl transition-all duration-300 w-full"
              >
                <div className="p-2 flex gap-2 justify-start items-center w-full">
                  <div className="w-10 h-10 rounded-xl text-center p-1 bg-purple-400">
                    {contact.name.slice(0, 2)}
                  </div>
                  <div>{contact.name}</div>
                </div>
              </div>
            );
          })
        ))
      }
    </div>
  );
}
