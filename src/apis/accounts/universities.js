import api from "../api";

export const universities = async () => {
  const response = await api.get("/accounts/universities/");
  return response.data;  // { message: "...", data: [ {id, univ_name}, ... ] }
};