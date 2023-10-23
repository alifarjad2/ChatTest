import { useEffect } from "react";
import { useState } from "react";
import AddContact from "./addContact";

function SideBar() {

    const [contacts, setContacts] = useState([]);
    const [popUp, setpopUp] = useState(false);
    const showPop = () =>{
        setpopUp(!popUp)
    }

    const fetchContact = async () => {
        const res = await (await fetch("https://farawin.iran.liara.run/api/contact", {
            method: "GET",
            headers: {
                authorization: `${localStorage.token}`
            }

        })).json();
        // console.log (res)
        const myContact = res.contactList.filter((item) => {
            return item.ref == localStorage.username;

        })
        setContacts(myContact);
        console.log(myContact)
    };


   


    useEffect(() => {
        fetchContact()
    }, [])






    return (
        <div className="bg-slate-300 rounded-lg w-[250px] flex flex-col">
            {popUp && <AddContact /> }
            <div className="flex flex-row rounded-lg m-2">
                <h1 className="text-xl m-2 flex-1 ">فراوین</h1>
                {/* click add contact */}
                <button 
                onClick={showPop}
                className="text-2xl m-1">+</button>
            </div>

            <div className=" bg-slate-400/20 m-2 h-full overflow-y-auto
            rounded-xl flex flex-col text-center">
                {/* contact list */}
                <ul>
                    {contacts.map((i) => (
                        // contact item
                        <li className="hover:bg-slate-400 flex flex-row m-2 cursor-pointer rounded-lg h-12">
                            <div className="rounded-full h-10 w-10 flex justify-center items-center bg-slate-600 m-1">
                                ''
                            </div>
                            <span className="m-2">
                                {i.name}
                            </span>
                        </li>
                    ))}

                </ul>

            </div>

        </div>
    )
}
export default SideBar;