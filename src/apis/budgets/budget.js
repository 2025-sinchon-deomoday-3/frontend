import api from "../api";

// 예산 최초 생성 (POST)
export const createBudget = async (budgetData) => {
  const response = await api.post("/budgets/fill/", budgetData);
  return response.data;
};

// 예산 조회 (GET)
export const getBudget = async () => {
  const response = await api.get("/budgets/fill/");
  return response.data;
};

// 예산 수정 (PUT)
export const updateBudget = async (budgetData) => {
  const response = await api.put("/budgets/fill/", budgetData);
  return response.data;
};
