import { Router } from "express";
import { sendMessage,getChats,getMessages } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const chatRouter = Router();

chatRouter.post("/send-message",authMiddleware, sendMessage);
chatRouter.get("/get-chats",authMiddleware, getChats);
chatRouter.get("/get-messages/:chatId",authMiddleware, getMessages);

export default chatRouter;
