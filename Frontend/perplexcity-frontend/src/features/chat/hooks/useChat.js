import { initializeSocketConnection } from "../service/chat.socket";
import toast from "react-hot-toast";
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

async function handlesendMessage({
  message,
  chatId,
  selectedImage,
}) {
  try {
    dispatch(setLoading(true));

    const data = await sendMessage({
      message,
      chatId,
      selectedImage,
    });

    console.log("BACKEND RESPONSE:", data);

    const { chat, aiMessage, userMessage } = data;

    // New chat ho to backend ka ID, warna existing chatId
    const realChatId = chat ? chat._id : chatId;

    // Sirf NEW chat ko Redux mein create karo
    if (chat) {
  dispatch(
    createnewChat({
      chatId: chat._id,
      title: chat.title,
      lastUpdated: new Date().toISOString(),
    })
  );
}
    // User message add karo
    dispatch(
      addNewMessage({
        chatId: realChatId,
        content: userMessage.content,
        role: userMessage.role,
        image: userMessage.image,
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

  const errorMessage =
    error.response?.data?.message ||
    "Message send nahi ho saka. Dobara try karein.";

  toast.error(errorMessage);

  dispatch(seterror(errorMessage));

  throw error;
  } finally {
    dispatch(setLoading(false));
  }
}


 async function hanglegetChats() {
  try {
    dispatch(setLoading(true));

    const data = await getChats();
    const { chats } = data;

    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt || chat.createdAt,
          };

          return acc;
        }, {}),
      ),
    );
  } catch (error) {
    console.error("Get chats failed:", error);

    const errorMessage =
      error.response?.data?.message ||
      "Chats load nahi ho sake.";

    dispatch(seterror(errorMessage));
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
}

 async function handleOpenChats(chatId) {
  try {
    dispatch(setLoading(true));

    const data = await getMessages(chatId);
    const { messages } = data;

    const formattedMessages = messages.map((msg) => ({
      content: msg.content,
      role: msg.role,
      image: msg.image || null,
    }));

    dispatch(
      addMessages({
        chatId,
        messages: formattedMessages,
      })
    );

    dispatch(setCurrentChatId(chatId));

  } catch (error) {
  console.error("Get messages failed:", error);

  const errorMessage =
    error.response?.data?.message ||
    "Messages load nahi ho sake.";

  dispatch(seterror(errorMessage));

  toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
}
  async function handleDeleteChat(chatId) {
  try {
    dispatch(setLoading(true));

    await deletechat(chatId);

    // Redux se deleted chat remove karo
    const data = await getChats();
    const { chats } = data;

    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };

          return acc;
        }, {}),
      ),
    );

    // Agar deleted chat currently open thi
    if (localStorage.getItem("currentChatId") === chatId) {
      dispatch(setCurrentChatId(null));
    }

  } catch (error) {
  console.error("Delete chat failed:", error);

  const errorMessage =
    error.response?.data?.message ||
    "Chat delete nahi ho saka.";

  dispatch(seterror(errorMessage));

  toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
}

  return {
    initializeSocketConnection,
    handlesendMessage,
    hanglegetChats,
    handleOpenChats,
    handleDeleteChat
  };
};
