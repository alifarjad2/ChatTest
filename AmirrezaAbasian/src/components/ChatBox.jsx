const ChatBox = ({ text, date }) => {
  const _date = new Date(date);
  return (
    <div className="bg-zinc-500 flex w-1/2 my-2 rounded-l-xl rounded-tr-xl p-4 mr-4">
      <div className="basis-11/12">
        <span className="text-white">{text}</span>
      </div>
      <div className="basis-1/12">
        <span className="text-xs font-light text-zinc-600">
          {_date.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ChatBox;
