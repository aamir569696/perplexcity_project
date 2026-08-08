import { generateResponse, generateTtile } from "../services/ai.service.js";
import ChatModel from "../models/chat.model.js";
import MessageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  const { message, chat: chatId } = req.body;

  let chat = null;
  let title = null;

  if (!chatId) {
    title = await generateTtile(message);
    console.log("Generated title:", title);
    chat = await ChatModel.create({
      user: req.user.id,
      title: title,
    });
  }

  const userMessage = await MessageModel.create({
    chat: chatId || chat._id,
    content: message,
    role: "user",
  });

  const messages = await MessageModel.find({chat:chatId})

  const result = await generateResponse(messages);

  console.log("Messages in chat:", messages);

  const aiMessage = await MessageModel.create({
    chat: chatId || chat._id,
    content: result,
    role: "assistant",
  });

  res.json({
    geminiMessage: result,
    title,
    chat,
    aiMessage,
  });

 // console.log("Received message:", message);
}
