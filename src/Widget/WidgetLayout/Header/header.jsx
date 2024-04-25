// import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import AppContext from "../../AppContext";
// import { motion } from "framer-motion";
// import { useDetectClickOutside } from "../../../hooks/useDetectClickOutside";
// import { useDispatch } from "react-redux";
// import { setToggleWidget } from "../../widgetSlice";
// import {
//   removeAllMessages,
//   resetBot,
//   resetMessageState,
//   setUserTypingPlaceholder,
//   toggleBotTyping,
//   toggleUserTyping,
// } from "../Messages/messageSlice";
// import { Icon } from "./Icons";

// const dropdownMenu = [
//   {
//     title: "Restart",
//   },
//   {
//     title: "Clear Chat",
//   },
//   {
//     title: "Close",
//   },
// ];

export const Header = () => {
  // const dispatch = useDispatch();
  const appContext = useContext(AppContext);
  const {
    botSubTitle,
    botTitle,
    botAvatar,
    chatHeaderCss,
    // shopGptServerUrl,
    // welcomeMessage,
    // channel_id,
    // metadata,
  } = appContext;

  const { textColor, backgroundColor, enableBotAvatarBorder } = chatHeaderCss;
  // const [showDropdown, setShowDropdown] = useState(false);
  // const dropdownRef = useDetectClickOutside({
  //   setShowModal: setShowDropdown,
  // });

  // const handleCloseButton = () => {
  //   dispatch(setToggleWidget(false));
  //   setShowDropdown(!showDropdown);
  // };

  // const handleClearChatButton = () => {
  //   dispatch(removeAllMessages());
  //   dispatch(toggleBotTyping(false));
  //   dispatch(toggleUserTyping(true));
  //   dispatch(setUserTypingPlaceholder("Type you message..."));
  //   setShowDropdown(!showDropdown);
  // };
  // const handleRestartButton = () => {
  //   dispatch(resetMessageState());
  //   setShowDropdown(!showDropdown);
  //   dispatch(
  //     resetBot({
  //       shopGptServerUrl,
  //       message: "/restart",
  //       welcomeMessage,
  //       sender: channel_id,
  //       metadata,
  //     })
  //   );
  // };
  return (
    <>
      <div
        className="relative flex h-[20%]  cursor-default items-center space-x-4  rounded-t-[1.8rem]  p-2 shadow-lg drop-shadow"
        style={{ backgroundColor, color: textColor }}
      >
        <div
          className="shrink-0 rounded-full   p-2"
          style={{ borderColor: textColor }}
        >
          <img
            className="h-12 w-12 rounded-full"
            src={botAvatar}
            alt="Bot Logo"
          />
        </div>
        <div className="w-full ">
          <div className="text-xl font-semibold antialiased">{botTitle}</div>
          <p className="">{botSubTitle}</p>
        </div>
        {/* <motion.div
          whileHover={{ scale: 1.2 }}
          className="flex"
          onClick={() => {
            setShowDropdown(!showDropdown);
          }}
        >
          <Bars3BottomRightIcon className=" h-7 w-7" />
        </motion.div> */}
      </div>
      {/* {showDropdown && (
        <div
          id="dropdown"
          className=" absolute right-5 top-16 z-50 w-fit cursor-default  divide-y divide-gray-100 rounded-xl bg-white shadow-lg"
          ref={dropdownRef}
        >
          <ul
            className="rounded-lg py-1 text-sm"
            aria-labelledby="dropdownDefault"
            style={{
              backgroundColor,
              color: textColor,
              border: `1px solid ${textColor}`,
            }}
          >
            {dropdownMenu.map((item, idx) => {
              const { title } = item;
              return (
                <div
                  key={idx}
                  className="flex hover:opacity-70"
                  onClick={() => {
                    if (title === "Close") {
                      handleCloseButton();
                    } else if (title === "Clear Chat") {
                      handleClearChatButton();
                    } else {
                      handleRestartButton();
                    }
                  }}
                >
                  <div className="flex items-center justify-center pl-2">
                    <Icon name={title} />
                  </div>
                  <div>
                    <span className="block px-2 py-2">{title}</span>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      )} */}
    </>
  );
};
