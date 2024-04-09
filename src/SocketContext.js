import { createContext } from "react";
import { io } from "socket.io-client";
import {
  addMessage,
  toggleBotTyping,
  toggleUserTyping,
} from "./Widget/WidgetLayout/Messages/messageSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId") || String(Date.now());
    localStorage.setItem("sessionId", sessionId);

    const socket = io.connect("http://localhost:4123/", {
      query: {
        sessionId: `${sessionId}`,
        channel_id: "660bcd66177d9d7e62f8b6f0",
      },
      transports: ["websocket"],
    });
    socket.on("connect", async () => {
      console.log(socket.id, "socket connection established");
      socket.on(`get_contact-${socket.id}`, (data) => {
        setUser(data);
      });

      socket.on("bot message", (eventJson) => {
        const botMessage = {
          type: eventJson.type,
          [eventJson.type]: eventJson.message,
          ts: eventJson.timeStamp,
          sender: "BOT",
        };
        console.log("Bot Message", botMessage);
        dispatch(addMessage(botMessage));
        dispatch(toggleBotTyping(false));
      });
      socket.on("bot typing", () => {
        dispatch(toggleBotTyping(true));
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
