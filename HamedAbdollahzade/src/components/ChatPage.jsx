
const ChatPage = ({ selected, sender, reciver }) => {

    return (
        <div className="flex flex-col  rounded-lg  w-full h-full p-2">

            {!selected &&
                <div className="flex w-full h-full justify-center items-center ">Selected contact ? </div>
            }
            {sender.length == 0 && reciver.length == 0 && selected &&
                <div className="flex w-full h-full justify-center items-center ">No Message </div>
            }

            {sender.map((sender) => (
                <div className="bg-green-200 break-words m-1 w-[150px] rounded-lg  flex flex-col justify-center items-center self-start">

                    <div className="break-words w-full p-2">{sender.text}</div>
                    <div className="break-words text-xs p-1">{sender.date}</div>
                </div>

            ))}

            {reciver.map((reciver) => (
                <div className="bg-cyan-200 break-words  m-1 w-[150px] rounded-lg  flex flex-col justify-center items-center self-end">
                    <div>{selected.name}</div>
                    <div className="break-words w-full p-2">{reciver.text}</div>
                    <div className="break-words text-xs p-1">{reciver.date}</div>
                </div>

            ))}

        </div>

    )
}
export default ChatPage