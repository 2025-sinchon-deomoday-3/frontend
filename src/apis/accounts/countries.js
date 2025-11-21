import api from "../api";

export const countries = async () => {
  const response = await api.get("/accounts/countries/");
  return response.data;  // { message: "...", data: [ {code, label}, ... ] }
};