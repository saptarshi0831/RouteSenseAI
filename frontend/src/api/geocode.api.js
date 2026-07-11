import apiClient from "./apiClient";

export const searchLocation = async (query) => {
  const response = await apiClient.get("/geocode/search", {
    params: {
      q: query,
    },
  });

  return response.data;
};