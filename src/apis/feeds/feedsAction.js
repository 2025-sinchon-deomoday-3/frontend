import api from "../api";

/* ================================
        스크랩 (Scrap)
================================ */

//스크랩 추가
export const addScrap = async (ledgerId) => {
  const response = await api.post(`/feeds/${ledgerId}/scrap/`);
  return response.data;
};

//스크랩 삭제
export const removeScrap = async (ledgerId) => {
  const response = await api.delete(`/feeds/${ledgerId}/scrap/`);
  return response.data;
};

//내 스크랩 목록 조회
export const getMyScraps = async () => {
  const response = await api.get("/feeds/scraps/");
  return response.data;
};


/* ================================
        좋아요 (Favorites)
================================ */

//좋아요 추가
export const addFavorite = async (ledgerId) => {
  const response = await api.post(`/feeds/${ledgerId}/favorites/`);
  return response.data;
};

//좋아요 삭제
export const removeFavorite = async (ledgerId) => {
  const response = await api.delete(`/feeds/${ledgerId}/favorites/`);
  return response.data;
};
