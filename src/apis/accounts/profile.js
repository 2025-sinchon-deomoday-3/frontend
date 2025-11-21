import api from "../api";

// 프로필 조회 (GET)
export const getProfile = async () => {
  const response = await api.get("/accounts/profile/");
  return response.data;
};

// 프로필 수정 (PUT)
export const updateProfile = async (profileData) => {
    const response = await api.put("/accounts/profile/", profileData);
    return response.data;
};
