import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],

  // select chat & reset messages
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation, messages: [] }),

  // set full message list
  setMessages: (messages) => set({ messages }),

  // add single message (socket / send)
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export default useConversation;
