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
  const { channel_id, welcomeMessage } = appContext;
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId") || String(Date.now());
    localStorage.setItem("sessionId", sessionId);

    const socket = io.connect("http://localhost:4123/", {
      query: {
        sessionId: `${sessionId}`,
        channel_id: channel_id,
      },
      transports: ["websocket"],
    });
    const welcomeMsg = {
      type: "text",
      text: welcomeMessage,
      ts: new Date(),
      sender: "BOT",
    };
    welcomeMessage && dispatch(addMessage(welcomeMsg));
    socket.on("connect", async () => {
      console.log(socket.id, "socket connection established");

      socket.on("bot_message", (eventJson) => {
        const botMessage = {
          type: eventJson.type,
          [eventJson.type]: eventJson.message,
          ts: eventJson.timeStamp,
          sender: "BOT",
        };
        dispatch(addMessage(botMessage));
      });
      socket.on("bot_typing", (eventJson) => {
        console.log("status changed");
        dispatch(toggleBotTyping(eventJson.status));
      });
    });
    socket.on("disconnect", () => {
      console.log("scoket disconnected");
    });
    setSocket(socket);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, user }}>
      {children}
    </SocketContext.Provider>
  );
};
