import apiClient from "./apiClient";

export const askAI = async (
  message,
  context = {}
) => {
  const response = await apiClient.post(
    "/ai/chat",
    {
      message,
      context,
    }
  );

  return response.data;
};