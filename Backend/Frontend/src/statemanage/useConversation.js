import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],

  
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation, messages: [] }),

 
  setMessages: (messages) => set({ messages }),

  
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));

export default useConversation;
