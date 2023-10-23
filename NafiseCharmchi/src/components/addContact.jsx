import { useState } from "react";

function AddContact({ setShowAddContact }) {
  const [nameValue, setNameValue] = useState("");
  const [numberValue, setNumberValue] = useState("");

  return (
    <div className="w-full h-screen backdrop-blur-md absolute flex justify-center items-center">
      <div className="w-[300px] h-[300px] bg-orange-400 p-4 flex flex-col gap-2 ">
        <div
          id="exit"
          className="w-4 h-4 bg-red-500 rounded-full"
          onClick={() => setShowAddContact(false)}
        ></div>
        <h1 className="text-center font-bold text-lg"> Add Contact </h1>
        <label htmlFor="inputName"> اسم : </label>
        <input
          id="inputName"
          className="h-10 rounded-md p-2 "
          autoFocus
          onChange={(e) => setNameValue(e.target.value)}
        />
        {nameValue && nameValue.length < 3 ? (
          <span className="bg-red-500 absolute top-[260px] p-2 rounded-md">
            {" "}
            3 حرف{" "}
          </span>
        ) : (
          ""
        )}
        <label htmlFor="inputNumber"> شماره : </label>
        <input
          id="inputNumber"
          maxLength={11}
          className="h-10 rounded-md p-2 "
          onChange={(e) => setNumberValue(e.target.value)}
        />
        {numberValue && numberValue.length < 11 ? (
          <span className="bg-red-500 absolute top-[340px] p-2 rounded-md">
            {" "}
            11 رقم{" "}
          </span>
        ) : (
          ""
        )}
        {!nameValue && !numberValue ? (
          <button className=" w-fit p-2 bg-gray-500 m-auto rounded-xl hover:cursor-not-allowed ">
            ADD
          </button>
        ) : (
          <button
            className=" w-fit p-2 bg-red-500 m-auto rounded-xl "
            onClick={() =>
              fetch("https://farawin.iran.liara.run/api/contact", {
                headers: {
                  authorization:
                    "eyJ1c2VybmFtZSI6IjA5MDM3NDYxMzQ5IiwicGFzc3dvcmQiOiJzYWVlZDc5ODMiLCJuYW1lIjoiRmFyYXdpbiIsImRhdGUiOiIyMDIzLTA3LTEyVDE0OjM4OjE5LjM5M1oifQ==",
                },
                body: JSON.stringify({
                  username: numberValue,
                  name: nameValue,
                }),
                method: "POST",
              })
                .then((res) => res.json())
                .then((res) => {
                  alert(res.message);
                  if (res.code == 200) setShowAddContact(false);
                })
            }
          >
            {" "}
            ADD{" "}
          </button>
        )}
      </div>
    </div>
  );
}
export default AddContact;
