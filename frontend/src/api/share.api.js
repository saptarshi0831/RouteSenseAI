import apiClient from "./apiClient";

export const createShareSession = async (
  durationHours = 6
) => {
  const response = await apiClient.post(
    "/share/create",
    {
      durationHours,
    }
  );

  return response.data;
};

export const getShareSession = async (
  shareCode
) => {

  const response =
    await apiClient.get(
      `/share/${shareCode}`
    );

  return response.data;
};