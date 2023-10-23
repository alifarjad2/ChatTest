import { splitName } from "./index";
const Contact = ({ contact, click}) => {
  const avatarColor = {
    backgroundColor: "#" + (Math.floor(Math.random() * 1000000)),
  };
  return (
    <div
      className="flex  p-2 ml-1 rounded-xl hover:bg-gray-500 cursor-pointer transition-all w-auto"
      onClick={() => click(contact)}>
      <div
      style={avatarColor}
        className="text-center w-[55px] leading-[55px] rounded-2xl text-white shrink-0"
        >
        {splitName(contact.name)}
      </div>
      <div className="mr-2 w-full">
        <div className="flex justify-between items-center">
          <h4 className="text-white">{contact.name}</h4>
        </div>
      </div>
    </div>
  );
};

export default Contact;
