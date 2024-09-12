import { createContext } from "react";
import { io } from "socket.io-client";
import {
  addMessage,
  toggleBotTyping,
} from "./Widget/WidgetLayout/Messages/messageSlice";
import AppContext from "./Widget/AppContext";
import { useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const appContext = useContext(AppContext);
  const { channel_id, welcomeMessage, server_endpoint } = appContext;
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let sessionId;
    let welcomeMsg;
    if (localStorage.getItem("sessionId")) {
      sessionId = localStorage.getItem("sessionId");
    } else {
      sessionId = String(Date.now());
      welcomeMsg = {
        type: "text",
        text: welcomeMessage,
        ts: new Date(),
        sender: "BOT",
      };
    }
    localStorage.setItem("sessionId", sessionId);

    const socket = io.connect(server_endpoint, {
      query: {
        sessionId: `${sessionId}`,
        channel_id: channel_id,
      },
      transports: ["websocket"],
    });

    welcomeMessage && welcomeMsg && dispatch(addMessage(welcomeMsg));
    socket.on("connect", async () => {
      console.log(socket.id, "socket connection established");

      socket.on("bot_message", (eventJson) => {
        if (sessionId === eventJson.session_id) {
          let botMessage;
          switch (eventJson.type) {
            case "text": {
              botMessage = {
                type: eventJson.type,
                [eventJson.type]: eventJson.message,
                ts: eventJson.timeStamp,
                sender: "BOT",
              };
              break;
            }
            case "interactive": {
              botMessage = {
                type: eventJson.type,
                [eventJson.type]: eventJson.message[eventJson.type],
                callback: true,
                ts: eventJson.timeStamp,
                sender: "BOT",
              };
              break;
            }
            default: {
            }
          }
          dispatch(addMessage(botMessage));
        }
      });
      socket.on("bot_typing", (eventJson) => {
        dispatch(toggleBotTyping(eventJson.status));
      });
    });
    socket.on("disconnect", () => {
      console.log("scoket disconnected");
    });
    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
