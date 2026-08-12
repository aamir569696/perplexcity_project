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
  addMessages
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

  async function hanglegetChats() {
    dispatch(setLoading(true))

    const data=await getChats()
   const {chats}=data
   dispatch(setChats(chats.reduce((acc,chat)=>{
    acc[chat._id]={
      id:chat._id,
      title:chat.title,
      message:[],
      lastUpdated:chat.updateAt,
    }
    return acc
   },{})))
dispatch(setLoading(false))
    
  }

  async function handleOpenChats(chatId) {
    const data=await getMessages(chatId)
    const {message}=data

    const formetedmessages=message.map(msg=>({
      content:msg.content,
      role:msg.role
    }))

    dispatch(addMessages({
      chatId,
      message:formetedmessages
    }))

    dispatch(setCurrentChatId(chatId))

  }


  return {
    initializeSocketConnection,
    handlesendMessage,
    hanglegetChats,
    handleOpenChats
  };
};
