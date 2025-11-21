import api from "../api";

export const signup = async (userData) => {
  const response = await api.post("/accounts/signup/", userData);
  return response.data;  // { message: "...", data: {id, username, nickname, gender, homeUniversity, dispatch} }
};