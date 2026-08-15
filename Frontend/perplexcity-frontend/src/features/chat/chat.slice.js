import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",

  initialState: {
    chats: {},
   currentChatId: localStorage.getItem("currentChatId") || null,
    isLoading: false,
    error: null,
  },

  reducers: {
    // New chat create karo
    createnewChat: (state, action) => {
      const { chatId, title } = action.payload;

      // Agar chat pehle se  hai to uske messages delete mat karo
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: title || "New Chat",
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }
    },

    // Single new message add karo
    addNewMessage: (state, action) => {
      const { chatId, content, role } = action.payload;

      // Safety: agar chat Redux mein nahi hai to create karo
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: "New Chat",
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }

      state.chats[chatId].messages.push({
        content,
        role,
      });

      state.chats[chatId].lastUpdated = new Date().toISOString();
    },

    // Purani chat ke saare messages load karo
    addMessages: (state, action) => {
      const { chatId, messages } = action.payload;

      // Safety: chat available na ho to create karo
      if (!state.chats[chatId]) {
        state.chats[chatId] = {
          id: chatId,
          title: "New Chat",
          messages: [],
          lastUpdated: new Date().toISOString(),
        };
      }

      // Push ki bajaye replace karo
      state.chats[chatId].messages = messages;
    },

    setChats: (state, action) => {
      state.chats = action.payload;
    },

   setCurrentChatId: (state, action) => {
  state.currentChatId = action.payload;

  if (action.payload) {
    localStorage.setItem("currentChatId", action.payload);
  } else {
    localStorage.removeItem("currentChatId");
  }
},

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    seterror: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setChats,
  setCurrentChatId,
  setLoading,
  seterror,
  createnewChat,
  addNewMessage,
  addMessages,
} = chatSlice.actions;

export default chatSlice.reducer;