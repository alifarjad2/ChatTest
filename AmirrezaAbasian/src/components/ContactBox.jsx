const ContactBox = ({ name, setSelectedUser,userPhonenumber }) => {
  const handleSelect = () => {
    setSelectedUser && setSelectedUser({name, userPhonenumber});
  };
  return (
    <main
      onClick={handleSelect}
      className="bg-zinc-600 pr-2 flex items-center h-16 rounded-lg hover:opacity-80 transition-all cursor-pointer border-0 border-zinc-500 hover:border "
    >
      <div className="rounded-full select-none bg-violet-600 aspect-square w-10 flex items-center justify-center text-neutral-50">
        {name[0]}
      </div>
      <div className="mr-10">
        <span className="text-white font-semibold select-none">{name}</span>
      </div>
    </main>
  );
};

export default ContactBox;
