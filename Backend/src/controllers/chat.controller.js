import { generateResponse, generateTtile } from "../services/ai.service.js";
import ChatModel from "../models/chat.model.js";
import MessageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  try {
    const { message, chat: chatId } = req.body;

    let chat;
    let title = null;

    // NEW CHAT
    
    if (!chatId) {
      title =
        process.env.MOCK_AI === "true"
          ? "Test Chat"
          : await generateTtile(message);

      console.log("Generated title:", title);

      chat = await ChatModel.create({
        user: req.user.id,
        title,
      });
    }

    // =========================
    // EXISTING CHAT
    // Check ownership
    // =========================
    else {
      chat = await ChatModel.findOne({
        _id: chatId,
        user: req.user.id,
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found or unauthorized",
        });
      }
    }

    // Current user's verified chat ID
    const currentChatId = chat._id;

    // =========================
    // SAVE USER MESSAGE
    // =========================
    const userMessage = await MessageModel.create({
      chat: currentChatId,
      content: message,
      role: "user",
    });

    // =========================
    // GET CHAT MESSAGES
    // =========================
    const messages = await MessageModel.find({
      chat: currentChatId,
    });

    if (!messages.length) {
      return res.status(400).json({
        success: false,
        message: "Messages array required",
      });
    }

    // =========================
    // AI RESPONSE
    // =========================
    let result;

    if (process.env.MOCK_AI === "true") {
      result = `Test AI response for: ${message}`;
    } else {
      result = await generateResponse(messages);
    }

    // =========================
    // SAVE AI MESSAGE
    // =========================
    const aiMessage = await MessageModel.create({
      chat: currentChatId,
      content: result,
      role: "assistant",
    });

    return res.status(200).json({
      success: true,
      geminiMessage: result,
      title: chat.title,
      chat,
      userMessage,
      aiMessage,
    });

  } catch (error) {
    console.error("SEND MESSAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
}
export async function getChats(req, res) {
  const { user } = req.user;

  const chats = await ChatModel.find({ user: req.user.id });

  res.status(200).json({
    message: "Chats retrieved successfully",
    chats,
  });
}

export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;

    const chat = await ChatModel.findOne({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found or unauthorized",
      });
    }

    const messages = await MessageModel.find({
      chat: chatId,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      messages,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get messages",
    });
  }
}

export async function deleteChat(req, res) {
  const { chatId } = req.params;

  const chat = await ChatModel.findByIdAndDelete({
    _id: chatId,
    user: req.user.id,
  });

  await MessageModel.deleteMany({ chat: chatId });

  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",
    });
  }

  res.status(200).json({
    message: "Chat and associated messages deleted successfully",
  });
}
