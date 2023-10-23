import { useState } from "react";

function AddContact() {
    const [nameContact , setNameContact] = useState("");
    const [numberContact , setNumberContact] = useState("");

    const closePopUp = () =>{
        location.reload();
    }

    const addContact = async () => {
        const result = await (await fetch("https://farawin.iran.liara.run/api/contact", {
            method: "POST",
            body : JSON.stringify({
                "username": `${numberContact}` ,
                "name": `${nameContact}` 
            }) ,
            headers: {
                authorization: `${localStorage.token}`
            }

        })).json();
        if (result) {
            alert (result.message);
            location.reload();                

        }
          
    }

    return (
        <div className="w-screen h-screen bg-gray-400 bg-opacity-60 flex items-center justify-center inset-0 z-10 fixed ">
            <div 
            id="container"
            className="bg-slate-500 h-[380px] w-[350px] mx-auto rounded-2xl flex flex-col text-center "
            >
                <div 
                onClick={closePopUp}
                className=" text-start cursor-pointer w-8 h-8 p-2 text-2xl">*</div>
                <h1 className="text-2xl m-4">افزودن مخاطب</h1>
                
                <div className="flex flex-col justify-center items-center  p-4"> 
                    <label htmlFor="phone" className="text-right m-2 ">شماره مخاطب :</label>
                    <input 
                    value={numberContact}
                    onChange={(e)=>setNumberContact(e.target.value)}
                    placeholder="شماره مخاطب را وارد کنید ..."
                    className="outline-none rounded-2xl h-10 p-2 bg-gray-300"
                    type="text" />
                    <label htmlFor="name" className="text-right m-2 "> نام مخاطب :</label>
                    <input 
                    value={nameContact}
                    onChange={(e)=>setNameContact(e.target.value)}
                    placeholder="نام مخاطب را وارد کنید ..."
                    className="outline-none rounded-2xl h-10 p-2 bg-gray-300"
                    type="text" />
                </div>

                <button 
                onClick={addContact}
                className="bg-slate-600 w-[220px] h-10 mx-auto rounded-2xl my-4 hover:bg-slate-700 "> افزودن مخاطب</button>

            </div>
        </div>
    )
}
export default AddContact ;