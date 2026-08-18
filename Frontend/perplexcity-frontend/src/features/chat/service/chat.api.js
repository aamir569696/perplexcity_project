import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// export const sendMessage = async ({ message, chatId, selectedImage }) => {
//   const formData = new FormData();

//   formData.append("message", message || "");

//   // Existing chat ID
//   if (chatId) {
//     formData.append("chat", chatId);
//   }

//   // Image
//   if (selectedImage) {
//     formData.append("image", selectedImage);
//   }

//   const response = await api.post("/api/chats/send-message", formData);

//   return response.data;
// };

export const sendMessage = async ({
  message,
  chatId,
  selectedImage,
}) => {
  const formData = new FormData();

  formData.append("message", message || "");

  if (chatId) {
    formData.append("chat", chatId);
  }

  if (selectedImage?.file) {
    formData.append("image", selectedImage.file);
  }

  console.log("========== FORM DATA ==========");
  console.log("message:", message);
  console.log("chatId:", chatId);
  console.log("selectedImage:", selectedImage);
  console.log("selectedFile:", selectedImage?.file);

  for (const [key, value] of formData.entries()) {
    console.log("FORM DATA:", key, value);
  }

  const response = await api.post(
    "/api/chats/send-message",
    formData
  );

  return response.data;
};

export const getChats = async () => {
  const response = await api.get("/api/chats");
  return response.data;
};

export const getMessages = async (chatId) => {
  const response = await api.get(`/api/chats/${chatId}/messages`);
  return response.data;
};

export const deletechat = async (chatId) => {
  const response = await api.delete(`/api/chats/delete-chat/${chatId}`);
  return response.data;
};
