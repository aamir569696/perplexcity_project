import { Router } from "express";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const chatRouter = Router();

chatRouter.post(
  "/send-message",
  authMiddleware,
  upload.single("image"),
  sendMessage,
);

chatRouter.get("/", authMiddleware, getChats);
chatRouter.get("/:chatId/messages", authMiddleware, getMessages);
chatRouter.delete("/delete-chat/:chatId", authMiddleware, deleteChat);

export default chatRouter;
