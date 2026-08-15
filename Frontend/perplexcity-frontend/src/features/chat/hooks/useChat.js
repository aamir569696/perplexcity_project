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
  addMessages,
} from "../chat.slice";
import { useDispatch } from "react-redux";

export const useChat = () => {
  const dispatch = useDispatch();

  // async function handlesendMessage({ message, chatId }) {
  //   dispatch(setLoading(true));
  //   const data = await sendMessage({ message, chatId });
  //   console.log("BACKEND RESPONSE:", data);

  //   const { chat, aiMessage } = data;

  //   // Agar new chat hai to backend chat object dega,
  //   // warna purana chatId use hoga
  //   const realChatId = chat ? chat._id : chatId;

  //   dispatch(
  //     createnewChat({
  //       chatId: realChatId,
  //       title: chat?.title || chats[realChatId]?.title || "New Chat",
  //     }),
  //   );
  //   dispatch(
  //     addNewMessage({
  //       chatId: realchatId,
  //       content: message,
  //       role: "user",
  //     }),
  //   );

  //   dispatch(
  //     addNewMessage({
  //       chatId: realchatId,
  //       content: aiMessage.content,
  //       role: aiMessage.role,
  //     }),
  //   );

  //   dispatch(setCurrentChatId(realchatId));
  // }

async function handlesendMessage({ message, chatId }) {
  try {
    dispatch(setLoading(true));

    const data = await sendMessage({ message, chatId });

    console.log("BACKEND RESPONSE:", data);

    const { chat, aiMessage } = data;

    // New chat ho to backend ka ID, warna existing chatId
    const realChatId = chat ? chat._id : chatId;

      // Sirf NEW chat ko Redux mein create karo
    if (chat) {
      dispatch(
        createnewChat({
          chatId: chat._id,
          title: chat.title,
        })
      );
    }

    // User message add karo
    dispatch(
      addNewMessage({
        chatId: realChatId,
        content: message,
        role: "user",
      })
    );

    // AI message add karo
    dispatch(
      addNewMessage({
        chatId: realChatId,
        content: aiMessage.content,
        role: aiMessage.role,
      })
    );

    // Current chat set karo
    dispatch(setCurrentChatId(realChatId));

  } catch (error) {
    console.error("Message send failed:", error);
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
}


  async function hanglegetChats() {
    dispatch(setLoading(true));

    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            message: [],
            lastUpdated: chat.updateAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handleOpenChats(chatId) {
    const data = await getMessages(chatId);
    const { messages } = data;

    const formetedmessages = messages.map((msg) => ({
      content: msg.content,
      role: msg.role,
    }));

    dispatch(
      addMessages({
        chatId,
        messages: formetedmessages,
      }),
    );

    dispatch(setCurrentChatId(chatId));
  }

  return {
    initializeSocketConnection,
    handlesendMessage,
    hanglegetChats,
    handleOpenChats,
  };
};
