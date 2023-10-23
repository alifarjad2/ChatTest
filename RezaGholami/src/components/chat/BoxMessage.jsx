import useSWR from "swr";
import { useStore } from "../../store";
import { useState , useRef ,  useEffect } from "react";
const fetchWithToken = (url) =>
  fetch(url, {
    headers: {
      authorization: localStorage.token,
    },
  }).then((res) => res.json());
const BoxMessage = () => {
  const { contactSelected, setChatData, chatData } = useStore();
  const [chatSender, setChatSender] = useState("");
  const [chatReceiver, setChatReceiver] = useState("");
  const containerChat = useRef(null);
  const { data } = useSWR(
    "https://farawin.iran.liara.run/api/chat/",
    fetchWithToken,
    { refreshInterval: 2000 }
  );

  useEffect(() => {
    containerChat.current
      ? (containerChat.current.scrollTop =
        containerChat.current.scrollHeight)
      : "";
  });

  useEffect(() => {
    setChatData(data);
  }, [data]);


  //////////)
  const getChatsMe = () => {
    const allChatSender = chatData?.chatList.filter(
        (item) =>
          item.sender === localStorage.username &&
          contactSelected.username === item.receiver
      );
      setChatSender(allChatSender);
    const allChatReceiver = chatData?.chatList.filter(
      (item) =>
        item.receiver === localStorage.username &&
        contactSelected.username === item.sender
    );
    setChatReceiver(allChatReceiver);
  };
  /////
  useEffect(() => {
    contactSelected ? getChatsMe() : "";
  }, [contactSelected, chatData]);
  ///////
  const chatDataSort = [...chatReceiver, ...chatSender].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return <>
   <div
      ref={containerChat}
      className=" h-full overflow-y-auto my-1 pr-2 items-end overflow-x-hidden absolute left-0 right-0">
      {chatDataSort.length == 0 && contactSelected ? (
        <div className="w-full h-full flex justify-center items-center">
          <div
            className="text-white font-bold text-sm inline-block">
            پیامی وجود ندارد !
          </div>
        </div>
      ) : (
        chatDataSort.map((chatData, index) => {
          const date = new Date(chatData.date);
          const chatDate = date.toLocaleDateString("fa-ir", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
          const time = date.toLocaleTimeString("fa-ir", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return (
            chatData.receiver == localStorage.username ? (
                <div className="w-full flex flex-row-reverse">
                <div className="ml-2 max-w-[75%] min-w-[20%] p-2 flex flex-col bg-slate-600 mb-5 rounded-md " key={index}> 
                <p className="break-words w-[100%]">{ chatData.text}</p>
                <strong className="text-xs">{chatDate}ساعت{time}</strong>
                   </div>
                </div>
            ) : (
                   <div className="flex flex-row">
                <div className="mr5-2 flex flex-col max-w-[75%] min-w-[20%] p-2 bg-blue-200 mb-5 flex-start rounded-md " key={index}>
                <p className="break-words w-[100%]">{chatData.text}</p>
                <strong  className="text-xs">{chatDate}ساعت{time}</strong>
                   </div>
                </div>
            )
          );
        })
      )}
    </div>
  
  </>;
};
export default BoxMessage;


