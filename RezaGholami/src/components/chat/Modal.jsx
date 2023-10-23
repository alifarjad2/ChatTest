import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Modal = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [isValidateTel, setIsValidateTel] = useState(null);
  const [isValidateName, setIsValidateName] = useState(null);
  ////////////////////////
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
    (/^09([0-9]{9})$/).test(e.target.value)
    ? setIsValidateTel(true)
      : setIsValidateTel(false);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
    e.target.value.length >= 3
      ? setIsValidateName(true)
      : setIsValidateName(false);
  };

  const closeModal = (e) => {
    if (e.target.id === "ForClosePopUp") navigate("/chat");
  };

  const sendAddContactData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://farawin.iran.liara.run/api/contact",
        {
          headers: {
            authorization: localStorage.token,
            "content-type": "application/json",
          },
          body: JSON.stringify({ username: phoneNumber, name: userName }),
          method: "POST",
        }
      );
      if (response.status == "200") alert("با موفقیت افزوده شد");
      else alert("مخاطب اضافه نشد");
    } catch (error) {
      console.log(error);
    }
  };
  const sendEditContactData = async(e) => {
    e.preventDefault()
    try {
        const response = await fetch(
          "https://farawin.iran.liara.run/api/contact",
          {
            headers: {
              "accept-language": "en-US,en;q=0.9",
              authorization: localStorage.token,
              "content-type": "application/json",
            },
            body: JSON.stringify({ username: phoneNumber,name:userName }),
            method: "PUT",
          }
        );
        if (response.status == "200") alert(" با موفقیت ویرایش شد") ;
        else alert(" ویرایش نشد");
      } catch (error) {
        console.log(error);
      }
  };
  const sendDeleteContactData = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://farawin.iran.liara.run/api/contact",
        {
          headers: {
            "accept-language": "en-US,en;q=0.9",
            authorization: localStorage.token,
            "content-type": "application/json",
          },
          body: JSON.stringify({ username: phoneNumber }),
          method: "DELETE",
        }
      );
      if (response.status == "200") alert("با موفقیت حذف شد");
      else alert("مخاطب حذف نشد");
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////////
  return (
    <div
      id="ForClosePopUp"
      className="w-full h-full flex items-center justify-center fixed z-20  backdrop-blur-sm"
      onClick={closeModal}
    >
      <form className=" flex flex-col bg-gray-700 text-white p-4 rounded-xl fixed">
        <h4 className="text-sm text-center mb-5">
          {location === "/chat/addContact"
            ? "فرم افزودن مخاطب"
            : location === "/chat/editContact"
            ? "فرم ویرایش مخاطب"
            : location === "/chat/deleteContact"
            ? "فرم حذف مخاطب"
            : ""}
        </h4>
        <input
          type="tel"
          className="rounded-md p-1 bg-gray-600 outline-none border-none"
          value={phoneNumber}
          placeholder="0912345678"
          onInput={handlePhoneNumber}
        />
        <div className="flex items-center justify-center h-4 py-3 text-xs mb-2">
          {isValidateTel === null ? null : isValidateTel ? (
            <span className="font-bold text-green-700">
              فرمت شماره موبایل صحیح است !
            </span>
          ) : (
            <span className="font-bold text-red-700">
              شماره با 09 شروع و 11 رقم میباشد !
            </span>
          )}
        </div>
        {location === "/chat/addContact" || location === "/chat/editContact" ? (
          <>
            <input
              className="bg-gray-600 rounded-md p-1 outline-none border-none"
              placeholder="نام ..."
              value={userName}
              onInput={handleUserName}
            />
            <div className="flex items-center justify-center h-2 py-3 text-xs mb-4">
              {isValidateName === null ? null : isValidateName ? (
                <span className="font-bold text-green-700">
                  تعداد کاراکتر صحیح میباشد !
                </span>
              ) : (
                <span className="font-bold text-red-700">
                  تعداد حروف باید بیشتر از 3 باشد !
                </span>
              )}
            </div>
          </>
        ) : null}
        {location === "/chat/addContact" ? (
          <button
            className="bg-gray-800 w-fill h-8 rounded-md"
            onClick={sendAddContactData}
            disabled={!(isValidateName && isValidateTel)}
          >
            افزوردن
          </button>
        ) : location === "/chat/editContact" ? (
          <button
            className="bg-gray-800 w-fill h-8 rounded-md"
            onClick={sendEditContactData}
            disabled={!(isValidateName && isValidateTel)}
          >
            ویرایش
          </button>
        ) : location === "/chat/deleteContact" ? (
          <button
            className="bg-gray-800 w-fill h-8 rounded-md"
            onClick={sendDeleteContactData}
            disabled={!isValidateTel}
          >
            حذف
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
export default Modal;
