import apiClient from "./apiClient";

export const createSOS = (payload) => {
  return apiClient.post("/sos", payload);
};

export const getActiveSOS = () => {
  return apiClient.get("/sos/active");
};