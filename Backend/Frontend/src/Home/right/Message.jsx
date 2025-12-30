import React from "react";
import { useAuth } from "../../context/AuthProvider.jsx";

function Message({ message }) {
  const { authUser } = useAuth();

  const itsMe = message.senderId === authUser?.user?._id;

  const chatAlign = itsMe ? "chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-blue-500" : "bg-gray-700";

  const formattedTime = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    : "";

  return (
    <div className="px-4 py-1">
      <div className={`chat ${chatAlign}`}>
        <div className={`chat-bubble text-white ${chatColor}`}>
          {message.message}
          <div className="text-xs opacity-60 mt-1 text-right">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
