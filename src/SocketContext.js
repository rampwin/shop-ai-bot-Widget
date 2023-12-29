import { createContext } from "react";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let sessionId = localStorage.getItem("sessionId") || String(Date.now());
    localStorage.setItem("sessionId", sessionId);

    const socket = io("http://localhost:4001/", {
      query: {
        sessionId: `${sessionId}`,
      },
    });
    socket.on("connect", async () => {
      console.log(socket.id, "socket connection established");
      socket.on(`get_contact-${socket.id}`, (data) => {
        setUser(data);
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
