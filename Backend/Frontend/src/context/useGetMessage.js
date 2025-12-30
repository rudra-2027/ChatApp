import { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      try {
        setLoading(true);

        const res = await axios.get(
          `/api/message/get/${selectedConversation._id}`
        );

        // ✅ ONLY store the array
        setMessages(res.data.messages || []);

      } catch (error) {
        console.error("Error in getting messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { loading, messages };
};

export default useGetMessage;
