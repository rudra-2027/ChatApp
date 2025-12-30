import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

function Messages() {
  const { loading, messages } = useGetMessage(); // messages MUST be an array
  useGetSocketMessage();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (!messages || messages.length === 0) return;

    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto px-4"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading && <Loading />}

      {!loading && messages.length > 0 &&
        messages.map((message, index) => (
          <div
            key={message._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </div>
        ))
      }

      {!loading && messages.length === 0 && (
        <p className="text-center mt-[20%] text-gray-400">
          Say 👋 Hi to start the conversation
        </p>
      )}
    </div>
  );
}

export default Messages;
