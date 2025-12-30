import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider.jsx";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io("http://localhost:3000", {
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(socketInstance);

      socketInstance.on("getOnline", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.off("getOnline");
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
