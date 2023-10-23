import React, { useState, useEffect } from "react";
import { useNumber } from "./zustand/sharedNumber";
export default function ChatSender() {
    const sharedNumber = useNumber((state)=>state.sharedNumber)
  const [sendText, setSendText] = useState("");
  const [refSendText, setRefSendText] = useState("");
  useEffect(() => {
    async function chatSender() {
      const body = JSON.stringify({
        contactUsername: sharedNumber,
        textHtml: sendText,
      });

      const response = await fetch("https://farawin.iran.liara.run/api/chat", {
        headers: {
          "Content-Type": "application/json",
          authorization:
            "eyJ1c2VybmFtZSI6IjA5MzY2MDM4ODU4IiwicGFzc3dvcmQiOiJtbWRyenBoemtyIiwibmFtZSI6IkZhcmF3aW4iLCJkYXRlIjoiMjAyMy0wNy0wN1QxNzo0MTo0OC4wMjZaIn0=",
        },
        body: body,
        method: "POST",
      });
    }

    if (refSendText) {
      chatSender();
      setSendText("");
    }
  }, [refSendText]);
  const handleSendText = (event) => {
    setSendText(event.target.value);
  };
  console.log(sendText);
  return (
    <div className="flex">
      <input
        onChange={handleSendText}
        value={sendText}
        className="w-full p-1 rounded-r-lg border-none outline-none"
        type="text"
        placeholder="پیغام خود را بنویسید ... "
      />
      <button
        onClick={() => {
          setRefSendText(Math.random());
        }}
        className="rounded-r-none"
      >
        ارسال
      </button>
    </div>
  );
}
