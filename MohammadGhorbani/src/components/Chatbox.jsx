import { useState } from "react";

export default function ChatBox({
  selectedcontact,
  handleRefreshChats,
  sender,
  receiver,
}) {
  const [send, setSend] = useState("");
  const handleSendMessage = (e) => {
    setSend(e.target.value);
    console.log(send);
  };

  const sendMessage = async () => {
    const response = await fetch("https://farawin.iran.liara.run/api/chat", {
      headers: {
        authorization: `eyJ1c2VybmFtZSI6IjA5MzA1MzIwOTEwIiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJtb2hhbW1tYWQgZ2hvcmJhbmkiLCJkYXRlIjoiMjAyMy0wOC0xMFQxNzo1Mzo0OS4wNjdaIn0`,
      },
      referrer: "https://farawin.iran.liara.run/doc/",
      body: JSON.stringify({
        contactUsername: localStorage.username,
        textHtml: send,
      }),
      method: "POST",
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="w-2/3 h-full flex flex-col p-3 bg-green-200 rounded-xl  border-solid  border-[1px] border-black">
      {!selectedcontact ? (
        <div className=" w-full h-full flex flex-col justify-center text-2xl font-bold text-center  max-lg:w-full">
          لطفا یک مخاطب انتخاب کنید
        </div>
      ) : (
        <>
          <div className="w-full h-16 flex">
            <div className="flex justify-start">{selectedcontact?.name}</div>
            <div className="flex justify-end">
              <div>ویرایش مخاطب</div>
              <button
                onClick={handleRefreshChats}
                className="border-[1px] border-black w-9 h-9 flex justify-center items-center font-bold text-base rounded-full"
              >
                Ref
              </button>
            </div>
          </div>
          {/* <div className=" h-full">
            {sender?.map((s) => (
              <div>{s?.message}</div>
            ))}
          </div> */}
          <div className="flex m-1">
            <input
              onChange={handleSendMessage}
              type="text"
              className="flex-1"
            />
            <button
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </>
      )}
      {/* header chat */}
    </div>
  );
}
