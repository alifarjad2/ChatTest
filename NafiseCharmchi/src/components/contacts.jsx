import useStore from "../components/zustand";
import { useEffect } from "react";
function Contacts({ refreshContact }) {
  const { contacts, setContacts, setInfoChatter } = useStore();
  useEffect(() => {
    fetch("https://farawin.iran.liara.run/api/contact", {
      headers: {
        authorization:
          "eyJ1c2VybmFtZSI6IjA5MDM3NDYxMzQ5IiwicGFzc3dvcmQiOiJzYWVlZDc5ODMiLCJuYW1lIjoiRmFyYXdpbiIsImRhdGUiOiIyMDIzLTA3LTEyVDE0OjM4OjE5LjM5M1oifQ==",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setContacts(res.contactList));
  }, [refreshContact]);
  return (
    <>
      <div className="w-[300px] text-left overflow-y-scroll ">
        {contacts
          ?.filter((contact) => contact.ref == "09037461349")
          .map((item,index) => (
            <div
              key={item.userame + index}
              className=" mb-1 hover:bg-yellow-600 p-2 "
              onClick={() => setInfoChatter(item.userame)}
            >
              <p> name: {item.name} </p>
              <p> number : {item.username} </p>
            </div>
          ))}
      </div>
    </>
  );
}
export default Contacts;
