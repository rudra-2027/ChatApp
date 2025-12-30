import React from "react";
import useConversation from "../../statemanage/useConversation";
import { useSocketContext } from "../../context/SocketContext";

function ChatUser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  // 🔒 guard: no conversation selected
  if (!selectedConversation) {
    return null;
  }

  const isOnline = onlineUsers?.includes(selectedConversation._id);

  return (
    <div
      className="pt-2 pl-5 pb-3 z-50 flex h-[9vh] space-x-4 
      bg-gray-900 hover:bg-gray-800 duration-300"
    >
      <div className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}>
        <div className="w-14 rounded-full">
          <img
            src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
            alt="user avatar"
          />
        </div>
      </div>

      <div className="ml-5 flex flex-col justify-center">
        <h1 className="text-xl text-white font-semibold">
          {selectedConversation.name}
        </h1>
        <span className={`text-sm ${isOnline ? "text-green-400" : "text-gray-400"}`}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}

export default ChatUser;
