
const SearchContact = ({ onInput, value }) => {
  return (
    <div className="bg-gray-200 inline-flex lg:flex w-full  rounded-2xl  py-2 px-3 ">
      <input
        type="search"
        onInput={onInput}
        value={value}
        className="bg-transparent text-white w-full outline-none ml-2"
        placeholder="جستجو"
      />
    </div>
  );
};
export default SearchContact;
