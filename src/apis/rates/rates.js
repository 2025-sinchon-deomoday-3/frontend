import api from "../api";

export const convertRate = async ({ from, to, amount }) => {
  const response = await api.get("/rates/convert/", {
    params: {
      from,
      to,
      amount,
    },
  });
  return response.data;
};