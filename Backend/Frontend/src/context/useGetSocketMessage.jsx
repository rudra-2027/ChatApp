import { useEffect, useRef } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../statemanage/useConversation.js";
import sound from "../audio/noti.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { addMessage } = useConversation();

  // 🔥 preload audio ONCE
  const notificationSound = useRef(null);

  useEffect(() => {
    notificationSound.current = new Audio(sound);
    notificationSound.current.load();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      // reset audio so it plays instantly
      if (notificationSound.current) {
        notificationSound.current.currentTime = 0;
        notificationSound.current.play();
      }

      addMessage(newMessage);
    };

    socket.on("newMessage", handleNewMessage);

    return () => socket.off("newMessage", handleNewMessage);
  }, [socket, addMessage]);
};

export default useGetSocketMessage;
