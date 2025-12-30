// import { Socket } from "socket.io";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";
import { io } from "../SocketIO/server.js";


// Socket
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);
    await conversation.save();

    // 🔥 realtime emit
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      newMessage,
    });

  } catch (error) {
    console.error("Error in sendMessage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: chatUserId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chatUserId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        success: true,
        messages: [],
      });
    }

    res.status(200).json({
      success: true,
      messages: conversation.messages,
    });

  } catch (error) {
    console.error("Error in getMessage:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
