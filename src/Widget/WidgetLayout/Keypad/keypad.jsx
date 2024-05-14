import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createUserMessage } from "../../../utils/helpers";
import AppContext from "../../AppContext";
import { addMessage } from "../Messages/messageSlice";
import { SocketContext } from "../../../SocketContext";

const Textarea = styled.textarea`
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Keypad = () => {
  const dispatch = useDispatch();
  const appContext = useContext(AppContext);
  const [userInput, setUserInput] = useState("");
  const userTypingPlaceholder = useSelector(
    (state) => state.messageState.userTypingPlaceholder
  );
  const socket = useContext(SocketContext).socket;
  const user = useContext(SocketContext).user;

  const userTyping = useSelector((state) => state.messageState.userTyping);
  const { account_id, channel_id } = appContext;

  const handleSubmit = async () => {
    const timestamp = new Date();
    if (userInput.length > 0) {
      dispatch(addMessage(createUserMessage(userInput.trim())));
      socket.emit("widget_message_received", {
        message: {
          type: "text",
          text: userInput,
          fromMe: false,
        },
        timestamp,
        integration_id: channel_id,
        account_id,
        session_id: localStorage.getItem("sessionId"),
      });
      setUserInput("");
    }
  };

  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId") || String(Date.now());
    localStorage.setItem("sessionId", sessionId);

    return () => {
      socket?.off(`getMessage-${sessionId}`);
    };
  }, [socket, user]);

  return (
    <div className="mt-auto flex  h-[12%] items-center   rounded-b-[2rem] rounded-t-3xl  bg-slate-50">
      <Textarea
        rows={1}
        className={` mx-4 block w-full resize-none bg-slate-50 p-2.5 text-sm text-gray-900 outline-none ${
          userTyping ? "cursor-default" : "cursor-not-allowed"
        }`}
        placeholder={userTypingPlaceholder}
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const newValue =
              e.target.value.substring(0, start) +
              "\n" +
              e.target.value.substring(end);
            setUserInput(newValue);
            setTimeout(() => {
              e.target.setSelectionRange(start + 1, start + 1);
            });
          } else if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        readOnly={!userTyping}
      />
      <button
        type="submit"
        className={`${
          userInput.trim().length > 1 ? "cursor-default" : "cursor-not-allowed"
        } inline-flex justify-center rounded-full  p-2 hover:bg-slate-100 `}
        style={{ color: "gray" }}
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <PaperAirplaneIcon className="h-6 w-6 -rotate-45 stroke-[1.1px]" />
      </button>
    </div>
  );
};
