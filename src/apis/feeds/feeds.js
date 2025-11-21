import api from "../api";

//전체 피드 조회 (기본 정렬: 최신순)
export const getFeeds = async () => {
  const response = await api.get("/feeds/");
  return response.data;
};

//인기순 정렬
export const getPopularFeeds = async () => {
  const response = await api.get("/feeds/", {
    params: { sort: "popular" },
  });
  return response.data;
};

//검색 기능
export const searchFeeds = async (query) => {
  const response = await api.get("/feeds/", {
    params: { search: query },
  });
  return response.data;
};

//상세 조회
export const getFeedDetail = async (ledgerId) => {
  const response = await api.get(`/feeds/${ledgerId}/`);
  return response.data;
};