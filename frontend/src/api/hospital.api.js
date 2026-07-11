import apiClient from "./apiClient";

export const getNearbyHospitals = async (
  latitude,
  longitude
) => {
  const response = await apiClient.get(
    "/hospitals/nearby",
    {
      params: {
        latitude,
        longitude,
      },
    }
  );

  return response.data;
};