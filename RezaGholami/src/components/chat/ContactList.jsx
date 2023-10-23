import { useEffect , useState } from "react";
import useSWR from "swr";
import { useStore } from "../../store";
import { Link } from "react-router-dom";
import SearchContact from "./SearchContact";
import {FaUserPlus} from "react-icons/fa"
import Contact from "./Contact";
const fetchWithToken = (url) =>
    fetch(url, {
        headers: {
            authorization: localStorage.token,
        },
    }).then((res) => res.json());
//////////////////////////////
const ContactList = () => {
    const { data, error, isLoading } = useSWR(
        "https://farawin.iran.liara.run/api/contact",
        fetchWithToken
    );
    const [searchInputValue, setSearchInputValue] = useState("");
    const { setContactSelected} = useStore();
    const userList = data?.contactList?.filter(
        (contact) => contact.ref === localStorage.username
    )
    const searchContact = (e) => {
        setSearchInputValue(e.target.value);
    };
    let searchedContact = userList?.filter(
        (item) =>
            item.name.includes(searchInputValue) ||
            item.username.includes(searchInputValue)
    );
    const selectedContact = (contact) => {
        setContactSelected(contact);
    };
    return (
        <>
            <div className="flex gap-1" >
                <SearchContact onInput={searchContact} value={searchInputValue} />
                <Link
                    to={"/chat/addContact"}
                    className="flex justify-center items-center bg-gray-400 w-14 rounded-2xl">
                        <FaUserPlus/>
                </Link>
            </div>

            <div className="h-[70vh] mt-2 overflow-auto">
                {
                    searchedContact?.map((contact) => (
                        <Contact
                            contact={contact}
                            key={contact.username}
                            click={selectedContact}
                        />
                    ))
                }
            </div>
        </>
    )
}
export default ContactList


