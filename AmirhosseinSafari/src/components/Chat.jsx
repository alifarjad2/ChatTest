import { useState, useEffect } from "react";
import farawin from 'farawin'
import moment from "moment/moment";
import '../App.css'


const Chat = () => {

  const [namepro, setNamepro] = useState([]);
  const [user, setUser] = useState("");
  const [number, setNumber] = useState("");
  const [totalmessage, setTotalmessage] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState("");
  const [mobile, setmobile] = useState('');
  const [name, setName] = useState('');
  const [flagadd, setFlagadd] = useState(false);
  const [flagdelete, setFlagdelete] = useState(false);
  const [flagedit, setFlagedit] = useState(false);


  const handleUserClick = (name, username) => {
    setUser(name);
    setNumber(username);
  };

  const handleKeyPress = (event) => {

    if (event.key === 'Enter') {
      farawin.testAddChat(number, inputValue)
      setInputValue('')
    }
  };

  const handleKeysend = () => {
    farawin.testAddChat(number, inputValue)
    setInputValue('')
  }

  const setFlagAddcontact = () => {
    setFlagadd(true);
  }

  const setFlagdeletecontact = () => {
    setFlagdelete(true);
  }

  const setFlageditcpntact = () => {
    setFlagedit(true);
  }

  const Addcontact = () => {

    farawin.testAddContact(mobile, name );
  }

  const Deletecontact = () => {
    farawin.testDeleteContact(number)
  }

  const Editcontact = () => {
    farawin.testEditContact(number, name)
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await farawin.getContacts();
      const filteredContacts = response.contactList.filter(
        (contact) => contact.ref === localStorage.phone)
      setNamepro(filteredContacts);
    };
    fetchData();
  }, [namepro]);


  useEffect(() => {
    const fetchData = async () => {
      const response = await farawin.getChats();
      const filteredContacts = response.chatList
      setTotalmessage(filteredContacts)

    };
    fetchData();
  }, [totalmessage]);


  return (
    <>

      <div className='flex m-[5rem] ml-[17rem] mr-[17rem]'>

        <div className='bg-[#d9ead3] w-[18rem] h-[38rem] rounded-[1rem]' >

          <div className='flex  pr-8 pt-4'>
            <div className='text-md'>
              <span>پیام رسان فراوین</span>
            </div>

            <div className='ml-4 mr-12 ' onClick={setFlagAddcontact}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>

            <div onClick={setFlagdeletecontact}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </div>

          </div>

          <div className='flex bg-[#eeeeee] w-[16rem] h-10 rounded-[1rem] ml-4 mr-4 mt-4 items-center '>
            <input value={search}
              onChange={(e) =>
                setSearch(e.target.value)}
              className='bg-[#eeeeee] text-xs mr-2 w-[14rem] h-[1rem] outline-none' type="text" placeholder='جستجو ...' />
          </div>


          <div className='mt-6 h-[30.5rem] ' style={{ overflowY: "scroll" }}>
            {namepro.filter((e) => e.name.includes(search)).map((e) => (

              <div className='flex items-center mt-2 bg-[#eeeeee] rounded-[1rem] ml-2 mr-2 h-14'
                onClick={() => handleUserClick(e.name, e.username)}
                key={e.username}>
                <div className='rounded-full w-11 h-11 bg-[#93edd0] mr-4  items-center text-center pt-2.5' >
                  <span>{e.name.charAt(0)}{" "}
                    {(e.name.charAt(0)) !== e.name.charAt(e.name.length - 1) ? e.name.charAt(e.name.length - 1) : null}</span>
                </div>
                <div className='pr-3'>
                  <span>{e.name}</span>
                </div>
              </div>
            ))}

          </div>
        </div>

        <div>
          <div className='flex bg-[#d9ead3] w-[40rem] h-14 rounded-[1rem] ml-4 mr-4 items-center '>  {/* chatBox */}
            <div className='rounded-full w-11 h-11 bg-[#ffffff] mr-6 items-center text-center pt-2.5'>
              <span>{user.charAt(0)}{" "}
                {(user.charAt(0)) !== user.charAt(user.length - 1) ? user.charAt(user.length - 1) : "?"}</span>
            </div>
            <div className='pr-3'>
              <span>{user ? user : "مخاطبی انتخاب نشده است"}</span>
            </div>
            <div className='flex-1'></div>

            <div className='ml-8' onClick={setFlageditcpntact}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
          </div>

          <div className=" my-1 pl-2 overflow-auto h-[30.5rem] mr-4 ml-4" >


            {totalmessage.map((chat, e) => {
              if (chat.sender === localStorage.phone && chat.receiver === number) {

                return (
                  <div key={e.id} className="flex items-end mb-2">
                    <div className="text-center w-[50px] leading-[50px] bg-[#4eab6c] rounded-2xl">ش</div>
                    <div className="relative mr-3 text-[#eceff3] bg-[#6b8afe] p-3 rounded-2xl" id="about">
                      <span className="text-xs text-[#eceff3] text-end block">شما</span>
                      <p className="text-sm sm:text-base "> {chat.text}</p>
                      <strong className="block text-end mt-2 text-xs text-[#eceff3]">{moment(chat.date).format('dddd HH:mm')}</strong>
                    </div>
                  </div>
                )
              } else if (chat.receiver === localStorage.phone && chat.sender === number) {
                return (
                  <div key={e.id} className="flex items-end ml-2 flex-row-reverse mb-2">
                    <div className="text-center w-[50px] leading-[50px] bg-[#a9d2fe] rounded-2xl">
                      {user.charAt(0)}{" "}
                      {(user.charAt(0)) !== user.charAt(user.length - 1) ? user.charAt(user.length - 1) : null}</div>
                    <div className="relative ml-3 text-[#eceff3] bg-[#2E333D] p-3 rounded-2xl">
                      <span className="text-xs text-start block"> {user}</span>
                      <p className="text-sm sm:text-base"> {chat.text} </p>
                      <strong className="block text-start mt-2 text-xs text-[#eceff3]">{moment(chat.date).format('dddd HH:mm')}</strong>
                    </div>
                  </div>
                )
              }

            })}

          </div>

          <div className='flex bg-[#d9ead3] w-[40rem] h-14 rounded-[1rem] ml-4 mr-4 items-center '>  {/* input box */}
            <div className='bg-[#d9ead3] mr-3 '>
              <input onKeyPress={handleKeyPress}
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className='bg-[#d9ead3]  w-[35rem] h-8 outline-none' type="text" placeholder='پیام ...' />
            </div>
            <div className='mr-4' onClick={handleKeysend}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4.5} stroke="#000" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>

            </div>
          </div>
        </div>

        {flagadd ?
          <div className="z-40 bg-[#a9d2fe] w-[18rem] h-[18rem] mt-[7rem] mr-[9rem] rounded-lg" style={{ position: "absolute" }} >

            <form onSubmit={Addcontact}>

              <div className="m-3" onClick={() => setFlagadd(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>

              </div>
              <div className="">

                <div className="text-center">
                  <span className="text-xs font-bold ">فرم افزودن مخاطب</span>
                </div>

                <div className="p-2">
                  <label
                    className="text-xs"
                  >موبایل :</label>
                  <input
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) =>
                      setmobile(e.target.value)}
                    autoFocus
                    type="tel"
                    className=" rounded-md outline-none pr-2 h-8 text-xs w-[14rem] mr-4 form-control"
                    placeholder="شماره تلفن ..." />
                </div>

                <div className="p-2">
                  <label
                    className="text-xs"
                  >نام و نام خانوادگی :</label>
                  <input
                    id="mobile"
                    name="mobile"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)}
                    autoFocus
                    type="text"
                    className=" rounded-md outline-none pr-2 h-8 text-xs w-[14rem] mr-4 form-control"
                    placeholder="نام و نام خانوادگی ..." />
                </div>

                <div className="mt-4 w-[15rem] mr-6 bg-[#98d682] text-center rounded-md h-10 pt-2">
                  <button type="submit"
                    className="BTN">
                    افزودن مخاطب
                  </button>
                </div>

              </div>
            </form>
          </div> : null}


        {flagdelete ?
          <div className="z-40 bg-[#a9d2fe] w-[18rem] h-[12rem] mt-[7rem] mr-[9rem] rounded-lg" style={{ position: "absolute" }} >

            <form onSubmit={Deletecontact}>

              <div className="m-3" onClick={() => setFlagdelete(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>
              </div>

              <div>
                <div className="text-center">
                  <span className="text-xs font-bold ">فرم حذف مخاطب</span>
                </div>

                <div className="text-center">
                  <span>  آیا مایل به حذف {user} هستید؟   </span>
                </div>
                <div className="mt-4 w-[15rem] mr-6 bg-[#98d682] text-center rounded-md h-10 pt-2">
                  <button type="submit"
                    className="BTN">
                    حذف مخاطب
                  </button>
                </div>
              </div>
            </form>
          </div> : null}


        {flagedit ?
          <div className="z-40 bg-[#a9d2fe] w-[18rem] h-[18rem] mt-[7rem] mr-[9rem] rounded-lg" style={{ position: "absolute" }} >

            <form onSubmit={Editcontact}>

              <div className="m-3" onClick={() => setFlagedit(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                </svg>

              </div>
              <div className="">

                <div className="text-center">
                  <span className="text-xs font-bold ">فرم ویرایش مخاطب</span>
                </div>

                <div className="p-2">
                  <label
                    className="text-xs"
                  >موبایل :</label>
                  <input
                    id="mobile"
                    name="mobile"
                    value={number}
                    autoFocus
                    type="tel"
                    className=" rounded-md outline-none pr-2 h-8 text-xs w-[14rem] mr-4 form-control"
                  />
                </div>

                <div className="p-2">
                  <label
                    className="text-xs"
                  >نام و نام خانوادگی :</label>
                  <input
                    id="mobile"
                    name="mobile"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)}
                    autoFocus
                    type="text"
                    className=" rounded-md outline-none pr-2 h-8 text-xs w-[14rem] mr-4 form-control"
                    placeholder="نام و نام خانوادگی ..." />
                </div>
                <div className="mt-4 w-[15rem] mr-6 bg-[#98d682] text-center rounded-md h-10 pt-2">
                  <button type="submit"
                    className="BTN">
                    ویرایش مخاطب
                  </button>
                </div>

              </div>
            </form>
          </div> : null}

      </div>

      {/* COUNT */}
    </>


  )
}

export default Chat