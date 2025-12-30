import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const isSelected = selectedConversation?._id === user._id;
  const isOnline = onlineUsers?.includes(user._id);

  return (
    <div
      onClick={() => setSelectedConversation(user)}
      className={`cursor-pointer transition duration-300 
        ${isSelected ? "bg-slate-700" : "hover:bg-slate-600"}`}
    >
      <div className="flex items-center space-x-4 px-6 py-4">
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              alt="user avatar"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="font-semibold text-white">{user.name}</h1>
          <span className="text-sm text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
