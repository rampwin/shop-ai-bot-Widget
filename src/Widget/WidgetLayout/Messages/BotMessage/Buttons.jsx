import { useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createUserMessage } from "../../../../utils/helpers";
import AppContext from "../../../AppContext";
import { SocketContext } from "../../../../SocketContext";
import { addMessage, disableButtons } from "../messageSlice";
import { formattedTs, MardownText } from "../utils";

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

export const Buttons = ({
  buttons,
  index,
  showBotAvatar,
  ts,
  body,
  callback,
}) => {
  const socket = useContext(SocketContext).socket;
  const dispatch = useDispatch();
  const appContext = useContext(AppContext);
  const {
    botAvatar,
    channel_id,
    account_id,
    botMsgColor,
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
          className={`w-max whitespace-pre-line break-words rounded-[20px]  px-[15px] py-[12px] text-sm`}
          style={{
            color: botMsgColor,
            backgroundColor: botMsgBackgroundColor,
            maxWidth: "100%",
          }}
          dir="auto"
        >
          <MardownText text={body.text} />
        </div>
        <div
          className={`mt-2 flex w-max max-w-[calc(100%)] flex-wrap gap-2 self-start whitespace-pre-line  break-words text-sm`}
        >
          {buttons.map((item, idx) => (
            <Button
              type="button"
              key={idx}
              disabled={!callback}
              className={`rounded-md border-2 border-solid px-2 py-1.5 text-center text-sm font-medium shadow-md ${
                callback ? " hover:bg-gray-200" : "bg-gray-200"
              }`}
              enableHover={true}
              color={botMsgColor}
              backgroundColor={botMsgBackgroundColor}
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
