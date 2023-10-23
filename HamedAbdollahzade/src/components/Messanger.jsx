import { useEffect, useState } from "react";
import ChatPage from "./ChatPage";
import { useRef } from "react"

const Messanger = () => {
    // -------------------stats ----------------------------
    const [Contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState("");
    const [input, setInpute] = useState("");
    const [refresh, setRefresh] = useState(0);
    const [showAddContact, setShowAddContact] = useState(false);
    const [chats, setChats] = useState([]);
    const [sender, setSender] = useState([]);
    const [reciver, setReciver] = useState([]);


    // ------------ console.log-------------------

    console.log("contacts = ", Contacts)
    console.log("selected = ", selected)
    console.log("input = ", input)
    console.log("refresh = ", refresh)
    console.log("chats = ", chats)
    console.log("sender = ", sender)
    console.log("reciver = ", reciver)

    // ------------ console.log-------------------



    // -------------localStorage-------------------------------------
    localStorage.token = "eyJ1c2VybmFtZSI6IjA5MzMzNTM2NTQ2IiwicGFzc3dvcmQiOiIxMjM0NTY3OCIsIm5hbWUiOiJGYXJhd2luIiwiZGF0ZSI6IjIwMjMtMDctMDVUMTk6Mzg6MDUuMzA5WiJ9";
    localStorage.userMobile = '09333536546'
    // ----------requestlogin----------------------------------------

    const requestlogin = async () => {
        const res = await (await fetch('https://farawin.iran.liara.run/api/user/login', {
            method: 'POST',
            body: JSON.stringify(
                {
                    username: "09333536546",
                    password: "12345678"
                }
            ),
            headers: 'content-type'
        })).json()
    }
    // ----------------------------------------------
    const requestgetContact = async () => {
        const res = await (await fetch('https://farawin.iran.liara.run/api/contact', {
            method: 'GET',
            headers: { authorization: `${localStorage.token}` }
        })).json()
        // console.log(res)
        setContacts(res.contactList.filter((i) => i.ref == localStorage.userMobile))
    }
    // -------------------------------------------------------
    // ----------------------------------------------
    const requestgetChats = async () => {
        const res = await (await fetch('https://farawin.iran.liara.run/api/chat', {
            method: 'GET',
            headers: { authorization: `${localStorage.token}` }
        })).json()
        // console.log(res)
        setChats(res.chatList)
    }
    // -------------------------------------------------------

    const createSender = () => {

        setSender(chats?.filter((item) => {
            if (item.sender == localStorage.userMobile) {
                return item.receiver == selected.username

            }
        }))

    }
    // ------------------------------------------------------------
    // -------------------------------------------------------
    const createReciver = () => {

        setReciver(chats?.filter((item) => {
            if (selected.username == item.sender) {
                return localStorage.userMobile == item.receiver
            }
        }))

    }
    // ------------------------------------------------------------
    const creatSenderReciver = () => {
        createSender(),
            createReciver()
    }
    // -------------------
    const Send = async () => {


        const res = await (await fetch('https://farawin.iran.liara.run/api/chat', {
            method: 'POST',
            body: JSON.stringify({
                "contactUsername": `${selected.username}`,
                "textHtml": `${input}`
            })
            ,
            headers: { authorization: `${localStorage.token}` }
        })).json()
        console.log("send message = ", res)
        setInpute("");


    }



    useEffect(() => {

        requestgetContact();
        requestgetChats();
        { selected ? creatSenderReciver() : "" }

    }, [selected, refresh])
    // -----------------------------------------------------
    const chatContainer = useRef();
    if (chatContainer.current) { chatContainer.current.scrollTop += 10000000000; }
    // --------------------------------------------------
    // const mobileRegex =  /^09([0-9]{9})$/
    // ---------------------------------------


    return (
        <div>

            <div className="bg-cyan-500 w-full p-2 m-1 flex justify-between text-white"> <button onClick={() => { localStorage.clear(), location.reload() }} className="bg-red-400 p-1 rounded-lg ">Exit</button> Welcom to Farawin messenger  </div>

            {showAddContact && <div className="bg-blue-400 left-0 top-0 bottom-0 right-0 flex justify-center items-center fixed bg-opacity-5 backdrop-blur-sm">
                <div className="w-[300px] h-[300px] flex flex-col justify-between items-center border border-black rounded-lg">
                    <div>در حال احداث</div>
                    <button onClick={() => setShowAddContact(!showAddContact)} className="bg-red-400 w-full rounded-lg hover:bg-red-700">Exit</button>
                </div>
            </div>}


            {/* container all : */}
            <div className="bg-slate-500 w-[90vw] h-[90vh] p-1 flex justify-center items-center">

                {/* side bar container */}
                <div className="w-[250px] border rounded-lg bg-slate-100 p-1 h-full flex flex-col justify-start items-center ">

                    {/* -------------- option side bar  ------------------*/}
                    <div className=" border p-2  rounded-lg h-14 w-full flex justify-around items-center">

                        <button onClick={() => setRefresh((d) => d + 1)} className="bg-cyan-200 rounded-lg p-2 m-1">refresh</button>
                        <button onClick={() => setShowAddContact(!showAddContact)} className="bg-green-300 rounded-lg p-2 m-1">add </button>
                        <button className="bg-green-300 rounded-lg p-2  m-1">Edit </button>

                    </div>
                    {/* -------------- end option side bar  ------------------*/}

                    {/* ------------contact list-------------------- */}
                    <div className="border h-full w-full flex flex-col justify-start items-center">
                        {Contacts.map((contact) => (
                            <div onClick={() => setSelected(contact)} className=" border w-full flex flex-col justify-center items-center  h-12 rounded-lg hover:bg-green-300 cursor-pointer">

                                <div>{contact.name}</div>
                                <div className="text-xs ">{contact.username}</div>
                            </div>
                        ))}



                    </div>
                    {/* ------------end contact list-------------------- */}

                </div>
                {/* end side bar container */}


                {/* chat page container */}
                <div className="flex-1 border rounded-lg bg-slate-50 p-2 h-full flex flex-col justify-between items-center ">
                    <div className="border  rounded-lg w-full h-14 flex justify-center items-center">
                        {selected ? selected.name : "نام مخاطب "}
                    </div>
                    <div ref={chatContainer} className="border  rounded-lg w-full h-full overflow-y-auto overflow-x-hidden flex justify-center items-center">
                        <ChatPage selected={selected} sender={sender} reciver={reciver} />
                    </div>
                    <div className="border  rounded-lg w-full h-14 flex justify-center items-center">
                        <button onClick={() => Send()} className="hover:bg-green-300 border p-1 rounded-2xl">Send</button>

                        <input type="text" value={input} onChange={(e) => setInpute(e.target.value)} placeholder="Message ... " className="flex outline-none w-full m-1 p-2 flex-1  " />
                    </div>

                </div>
                {/*end chat page container */}



            </div>
            {/* end container all : */}


        </div>

    )
}




export default Messanger