import { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, addMessage } = useConversation();

  const sendMessages = async (messageContent) => {
    if (!messageContent || !selectedConversation?._id) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message: messageContent }
      );

      // ✅ Optimistic UI (append immediately)
      addMessage(res.data.newMessage);

    } catch (error) {
      console.error("Error in sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
}

export default useSendMessage;
