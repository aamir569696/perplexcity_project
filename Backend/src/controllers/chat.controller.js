import { generateResponse, generateTtile } from "../services/ai.service.js";
import ChatModel from "../models/chat.model.js";
import MessageModel from "../models/message.model.js";

export async function sendMessage(req, res) {
  const { message, chat:chatId } = req.body;

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

  
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "Messages array required in request body" });
    }


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

export async function getChats(req, res) {
  const { user }= req.user;

  const chats = await ChatModel.find({ user: req.user.id })

  res.status(200).json({
    message: "Chats retrieved successfully",
    chats
  })


}

export async function getMessages(req, res) {
  const { chatId } = req.params;

  const chat = await ChatModel.findById(
    {
      _id: chatId,
      user: req.user.id
    }
  )
  if (!chat) {
    return res.status(404).json({
      message: "Chat not found",

    })
  }

  const messages = await MessageModel.find({ chat: chatId });

  res.status(200).json({
    message: "Messages retrieved successfully",
    messages
  })

}