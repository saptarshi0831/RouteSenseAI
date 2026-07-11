import apiClient from "./apiClient";

export const loginUser = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await apiClient.post("/auth/signup", data);
  return response.data;
};