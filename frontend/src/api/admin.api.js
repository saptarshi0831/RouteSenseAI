import apiClient from "./apiClient";

export const getAdminStats = () => {
    return apiClient.get("/admin/dashboard");
};

export const acknowledgeSOS = (id) => {
    return apiClient.patch(`/admin/sos/${id}/acknowledge`);
};

export const resolveSOS = (id) => {
    return apiClient.patch(`/admin/sos/${id}/resolve`);
};
