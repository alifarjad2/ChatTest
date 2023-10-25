import Store from "./zustand";

const Contacts = () => {
  const { Contacts, setSelectedContact, selectedContact } = Store();
  return (
    <div className="flex p-1 flex-col overflow-y-auto grow">
      {Contacts.map((contact) => (
        <div
          onClick={(e) => {
            setSelectedContact(contact);
            e.stopPropagation();
          }}
          key={contact.ref + contact.username}
          className={`py-2 ${
            selectedContact?.username == contact.username && "bg-slate-500"
          } px-5 flex gap-3 hover:bg-slate-400 rounded-xl cursor-pointer`}
        >
          <div className="h-10 w-10 border my-auto border-black rounded-full"></div>
          <div>
            <div className="text-lg font-bold">{contact.name}</div>
            <div className="text-xs">{contact.username}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contacts;
