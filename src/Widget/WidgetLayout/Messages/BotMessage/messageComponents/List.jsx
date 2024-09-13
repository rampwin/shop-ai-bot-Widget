import { useContext, useEffect, useRef, useState } from "react";
import { MdFormatListBulleted } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { SocketContext } from "./../../../../../SocketContext";
import { createUserMessage } from "../../../../../utils/helpers";
import AppContext from "./../../../../AppContext";
import { addMessage } from "./../../messageSlice";
import { formattedTs, MardownText } from "./../../utils";

export const Button = styled.button`
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  &:hover {
    background-color: ${(props) =>
      props.enableHover ? props.hoverBackgroundColor : "none"};
    color: ${(props) => (props.enableHover ? props.color : "none")};
    border: ${(props) =>
      props.enableHover
        ? `${props.hoverborderWidth} solid ${props.borderColor}`
        : "none"};
  }
`;

export const List = ({ action, index, showBotAvatar, ts, body }) => {
  const [showList, setShowList] = useState(false);
  const { sections, button } = action;
  const [selectedOption, setSelectedOption] = useState();

  const socket = useContext(SocketContext).socket;
  const dispatch = useDispatch();
  const appContext = useContext(AppContext);
  const {
    botAvatar,
    channel_id,
    account_id,
    botMsgColor,
    chatHeaderCss,
    botMsgBackgroundColor,
  } = appContext;
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowList]);

  const handleButtonClick = () => {
    if (selectedOption?.id) {
      dispatch(addMessage(createUserMessage(selectedOption)));
      socket.emit("widget_message_received", {
        message: {
          type: "interactive",
          interactive: {
            type: "list_reply",
            ...selectedOption,
          },
          fromMe: false,
        },
        timestamp: new Date(),
        integration_id: channel_id,
        account_id,
        session_id: localStorage.getItem("sessionId"),
      });
      setShowList(false);
    }
  };

  return (
    <div className="flex space-x-1 ">
      <div className={`flex w-5 items-start`}>
        <img
          className={`h-5 w-5  rounded-full ${showBotAvatar ? "" : "hidden"}`}
          src={botAvatar}
          alt="Bot Logo"
        />
      </div>
      <div className="flex flex-col space-y-1">
        <div
          className={`flex w-max flex-col space-y-4 whitespace-pre-line break-words rounded-[20px]  px-[15px] py-[10px] text-center text-sm`}
          style={{
            color: botMsgColor,
            backgroundColor: botMsgBackgroundColor,
            maxWidth: "100%",
          }}
          dir="auto"
        >
          <MardownText text={body.text} />
          <button
            className="flex w-fit flex-1 items-center justify-center space-x-2 rounded-md py-1.5 hover:bg-gray-200"
            onClick={() => setShowList(true)}
          >
            <MdFormatListBulleted />
            <MardownText className="seld-center text-xs" text={button} />
          </button>
        </div>
        {showBotAvatar && (
          <div className="text-[10px] italic text-gray-500">
            {formattedTs(ts)}
          </div>
        )}
      </div>
      {showList && (
        <div
          ref={popupRef}
          className="fixed top-0 left-0 rounded-2xl bg-white shadow-2xl"
          style={{
            transform: "translate(15%, 70%)",
            width: "75%",
            zIndex: "9999",
          }}
        >
          <div
            className="m-0 flex w-full  rounded-t-2xl py-2 text-center"
            style={{
              color: chatHeaderCss.textColor,
              backgroundColor: chatHeaderCss.backgroundColor,
            }}
          >
            <div className="m-auto pl-6">
              <h4>{button}</h4>
            </div>
            <div className="mr-4 flex justify-center">
              <button enableHover={true} onClick={() => setShowList(false)}>
                <IoMdClose />
              </button>
            </div>
          </div>
          {sections.map((item) => (
            <div key={item.title} className="m-auto my-2 w-[calc(90%)] px-2">
              <div
                className="w-full rounded-sm px-2 text-sm"
                style={{
                  color: botMsgColor,
                  backgroundColor: botMsgBackgroundColor,
                }}
              >
                {item.title}
              </div>
              {item.rows.map((eachOption) => (
                <div
                  key={eachOption.id}
                  className="my-2 mx-4 flex w-[calc(90%)] rounded-sm p-1 text-left text-xs hover:bg-[#e7e7e7]"
                >
                  <input
                    type="radio"
                    id={`listItem-${eachOption.id}`}
                    name="options"
                    value={selectedOption}
                    onClick={() => setSelectedOption(eachOption)}
                    className="mr-2 self-center"
                  />
                  <label
                    htmlFor={`listItem-${eachOption.id}`}
                    className="w-full cursor-pointer"
                  >
                    {eachOption.title}
                  </label>
                </div>
              ))}
            </div>
          ))}
          <div className="flex w-full justify-end space-x-2 p-2">
            <Button
              type="button"
              className="rounded-lg border-2 border-solid px-3 py-1.5 text-center text-sm font-medium shadow-lg hover:bg-gray-300 hover:text-black"
              color={chatHeaderCss.textColor}
              enableHover={true}
              backgroundColor={chatHeaderCss.backgroundColor}
              onClick={() => handleButtonClick()}
            >
              Send
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
