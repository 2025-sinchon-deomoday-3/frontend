import api from "../api";

// 가계부 요약본 등록
export const createSnapshot = async (data) => {
  const response = await api.post("/summaries/snapshot/", data);
  return response.data;
};

// 가계부 세부 프로필 수정
export const updateSnapshot = async (data) => {
  const response = await api.put("/summaries/snapshot/", data);
  return response.data;
};

// 가계부 세부 프로필 조회
export const getSnapshot = async () => {
  const response = await api.get("/summaries/snapshot/");
  return response.data;
};

//가계부 요약본 비용 조회
export const getLedgerSummary = async () => {
  const response = await api.get("/summaries/ledger-summary/");
  return response.data;
};