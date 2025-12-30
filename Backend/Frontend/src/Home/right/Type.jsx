import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Type() {
  const { loading, sendMessages } = useSendMessage();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-3 h-[8vh] bg-gray-800 px-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type here..."
          className="w-full bg-slate-700 text-white rounded-full py-3 px-4 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-11 rounded-full bg-blue-600 flex items-center justify-center"
        >
          <IoSend className="text-xl text-white cursor-pointer" />
        </button>
      </div>
    </form>
  );
}

export default Type;
