import api from "../api";

export const exUniversities = async () => {
  const response = await api.get("/accounts/exchange-universities/");
  return response.data;  // { message: "...", data: [ {id, univ_name, country}, ... ] }
};