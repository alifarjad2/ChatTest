export default function Sidebar({
  filteredContacts,
  handleRefreshContact,
  setSelectedContact,
  setOpenAdd
}) {
  return (
    <div className="flex flex-col w-1/3 h-full relative p-3 bg-green-200 mx-4 rounded-xl border-solid  border-[1px] border-black">
      {/* Header */}

      <div className="flex gap-x-8">
        <h2>پیام رسان فراوین </h2>
        <button onClick={()=>{setOpenAdd(false)}}
        className="font-bold text-xl border-[1px] border-black rounded-full justify-center w-11 h-10">
          +
        </button>
        <button
          onClick={handleRefreshContact}
          className="border-[1px] border-black w-9 h-9 flex justify-center items-center font-bold text-base rounded-full"
        >
          Ref
        </button>
      </div>
      {/* contacts */}
      <div className="flex flex-col overflow-auto w-full">
        {filteredContacts?.map((contact) => (
          <div
            onClick={() => {
              setSelectedContact(contact);
            }}
            key={contact?.id}
            className="flex hover:bg-green-300 my-2 rounded-xl"
          >
            <div className=" w-9 h-9 flex  justify-center  border-black border-[1px] rounded-xl ml-3">
              {contact?.name[0]}
            </div>
            {contact?.name}
          </div>
        ))}
      </div>
    </div>
  );
}
