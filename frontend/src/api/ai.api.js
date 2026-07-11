import apiClient from "./apiClient";

export const askAI = async (message) => {
  const response = await apiClient.post("/ai/chat", {
    message,
  });

  return response.data;
};