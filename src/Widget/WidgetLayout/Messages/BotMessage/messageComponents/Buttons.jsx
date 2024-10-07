import { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createUserMessage } from "./../../../../../utils/helpers";
import AppContext from "./../../../../AppContext";
import { SocketContext } from "./../../../../../SocketContext";
import { addMessage, disableButtons } from "./../../messageSlice";
import { formattedTs, MardownText } from "./../../utils";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const invertColor = (hex) => {
  if (hex?.startsWith("#")) {
    hex = hex.slice(1);
  }
  // Parse hex color into RGB
  const r = (255 - parseInt(hex?.slice(0, 2), 16))
    .toString(16)
    .padStart(2, "0");
  const g = (255 - parseInt(hex?.slice(2, 4), 16))
    .toString(16)
    .padStart(2, "0");
  const b = (255 - parseInt(hex?.slice(4, 6), 16))
    .toString(16)
    .padStart(2, "0");

  return `#${r}${g}${b}`;
};

export const Button = styled.button`
  border-radius: ${(props) => props.borderRadius};
  border-width: ${(props) => props.borderWidth};
  border-color: ${(props) => props.borderColor};
  border-style: solid;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) =>
    props.disabled ? invertColor(props.color) : props.color};
  &:hover {
    background-color: ${(props) =>
      props.enableHover ? props.hoverBackgroundColor : "none"};
    color: ${(props) =>
      props.enableHover ? invertColor(props.color) : "none"};
    border: ${(props) =>
      props.enableHover
        ? `${props.hoverborderWidth} solid ${props.borderColor}`
        : "none"};
  }
`;

export const Buttons = ({
  action,
  index,
  showBotAvatar,
  ts,
  body,
  callback,
}) => {
  const socket = useContext(SocketContext).socket;
  const dispatch = useDispatch();
  const { buttons, parameters } = action;

  const appContext = useContext(AppContext);
  const {
    botAvatar,
    channel_id,
    account_id,
    botMsgColor,
    chatHeaderCss,
    botMsgBackgroundColor,
  } = appContext;
  const handleButtonClick = (item, index) => {
    if (item[item.type].id) {
      dispatch(disableButtons(index));
      dispatch(addMessage(createUserMessage(item[item.type])));
      socket.emit("widget_message_received", {
        message: {
          type: "interactive",
          interactive: {
            type: "button_reply",
            ...item[item.type],
          },
          fromMe: false,
        },
        timestamp: new Date(),
        integration_id: channel_id,
        account_id,
        session_id: localStorage.getItem("sessionId"),
      });
    }
  };
  return (
    <div className="flex max-w-[calc(100%)]">
      <div className={`flex w-5 items-start`}>
        <img
          className={`h-5 w-5  rounded-full ${showBotAvatar ? "" : "hidden"}`}
          src={botAvatar}
          alt="Bot Logo"
        />
      </div>
      <div className="flex max-w-[calc(75%)] flex-col space-y-1">
        <div
          className={`w-max whitespace-pre-line break-words rounded-[20px] px-[15px]  py-[12px] text-center text-sm`}
          style={{
            color: botMsgColor,
            backgroundColor: botMsgBackgroundColor,
            maxWidth: "100%",
          }}
          dir="auto"
        >
          <MardownText text={body.text} />

          {parameters && (
            <Button
              type="button"
              className="mt-2 flex w-fit flex-row items-center justify-center gap-2 rounded-md px-1 py-1 text-center text-sm  font-medium hover:bg-gray-200"
              enableHover={true}
              onClick={() => window.open(parameters?.url, "_blank")}
              color={botMsgColor}
            >
              {parameters.display_text}
              <FaArrowUpRightFromSquare className="self" />
            </Button>
          )}
        </div>
        <div
          className={`mt-2 flex w-max max-w-[calc(100%)] flex-wrap gap-2 self-start whitespace-pre-line  break-words text-sm`}
        >
          {buttons?.map((item, idx) => (
            <Button
              type="button"
              key={idx}
              disabled={!callback}
              className={`w-fit.5 rounded-2xl border-2 border-solid px-2 py-1 text-center text-xs font-medium shadow-xl ${
                callback ? " hover:bg-gray-200" : "bg-gray-200"
              }`}
              enableHover={true}
              color={chatHeaderCss.textColor}
              hoverBackgroundColor={botMsgBackgroundColor}
              backgroundColor={
                callback ? chatHeaderCss.backgroundColor : botMsgBackgroundColor
              }
              onClick={async (e) => {
                e.preventDefault();
                handleButtonClick(item, index);
              }}
            >
              {item[item.type].title}
            </Button>
          ))}
        </div>
        {showBotAvatar && (
          <div className="text-[10px] italic  text-gray-500">
            {formattedTs(ts)}
          </div>
        )}
      </div>
    </div>
  );
};
