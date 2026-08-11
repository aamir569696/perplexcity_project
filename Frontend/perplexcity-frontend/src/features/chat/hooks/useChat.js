import { initializeSocketConnection } from "../service/chat.socket";
import {
  sendMessage,
  getChats,
  getMessages,
  deletechat,
 
} from "../service/chat.api";
import {
  setChats,
  setCurrentChatId,
  setLoading,
  seterror,
   createnewChat,
  addNewMessage,
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();
  async function handlesendMessage({ message, chatId }) {
    dispatch(setLoading(true));
    const data = await sendMessage({ message, chatId });
    const { chat, aimessage } = data;
    dispatch(createnewChat({
        chatId:chat._id,
        title:chat.title
    }))

    dispatch(addNewMessage({
        chatId:chat._id,
        content: message,
        role:'user'
    }))
   
    dispatch(addNewMessage({
        chatId:chat._id,
        content:aimessage.message,
        role:aimessage.role
    }))

    dispatch(setCurrentChatId(chat._id))

  }

  return {
    initializeSocketConnection,
    handlesendMessage,
  };
};
