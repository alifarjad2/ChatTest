import { useState } from "react";

export default function AddContact({ openAdd, setOpenAdd }) {
  const [addContact, setAddContact] = useState("");
  const [addnumber, setAddnumber] = useState("");
  const [editContact, setEditContact] = useState("");
  const [editnumber, setEditnumber] = useState("");

  const handleAddcontact = (e) => {
    setAddContact(e.target.value);
  };

  const handleAddnumber = (e) => {
    setAddnumber(e.target.value);
  };

  const handleEditcontact = (e) => {
    setEditContact(e.target.value);
  };

  const handleEditnumber = (e) => {
    setEditnumber(e.target.value);
  };

  const add = async () => {
    const response = await fetch("https://farawin.iran.liara.run/api/contact", {
      headers: {
        authorization: `eyJ1c2VybmFtZSI6IjA5MzA1MzIwOTEwIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJtb2hhbW1tYWQgZ2hvcmJhbmkiLCJkYXRlIjoiMjAyMy0wOC0xMFQxNzo1Mzo0OS4wNjdaIn0`,
      },
      referrer: "https://farawin.iran.liara.run/doc/",
      body: JSON.stringify({
        username: addContact,
        name: addnumber,
      }),
      method: "POST",
    });
    const data = await response.json();
    alert(data.message);
  };

  const edit = async () => {
    const response = await fetch("https://farawin.iran.liara.run/api/contact", {
      headers: {
        authorization: `eyJ1c2VybmFtZSI6IjA5MzA1MzIwOTEwIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJtb2hhbW1tYWQgZ2hvcmJhbmkiLCJkYXRlIjoiMjAyMy0wOC0xMFQxNzo1Mzo0OS4wNjdaIn0`,
      },
      referrer: "https://farawin.iran.liara.run/doc/",
      body: JSON.stringify({
        username: editContact,
        name: editnumber,
      }),
      method: "PUT",
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <>
      {!openAdd ? (
        <div className="w-96 h-80 m-auto border-[1px] absolute  rounded-xl border-black  bg-green-200  ">
          <div className="flex flex-col mt-6">
            <input type="text" className="m-2" onChange={handleAddcontact} />
            <input type="text" className="m-2" onChange={handleAddnumber} />

            <button onClick={add} className="bg-slate-400 hover:bg-green-500">
              اضافه کردن مخاطب
            </button>
          </div>
          <div className="flex flex-col mt-8">
            <input type="text" className="m-2" onChange={handleEditcontact} />
            <input type="text" className="m-2" onChange={handleEditnumber} />

            <button
              onClick={edit}
              className="bg-slate-400  hover:bg-yellow-500"
            >
              {" "}
              ویرایش مخاطب{" "}
            </button>
          </div>
          <button
            onClick={() => {
              setOpenAdd(true);
            }}
            className="flex w-full justify-center bg-red-200 my-3"
          >
            {" "}
            close
          </button>
        </div>
      ) : null}
    </>
  );
}
