import api from "../api";

//로그인
export const login = async ({ username, password, remember }) => {
  const response = await api.post("/accounts/login/", {
    username,
    password,
    remember,
  });

  return response.data; // { message, data: { id, username, access_token } }
};

//로그아웃
export const logout = async () => {
  const response = await api.post("/accounts/logout/");
  return response.data;  // { message: "성공적으로 로그아웃되었습니다." }
};