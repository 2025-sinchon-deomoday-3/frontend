import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 요청할 때 매번 localStorage에서 토큰 가져오기
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});

// 🔥 응답 에러 인터셉터
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 서버가 HTML만 보내는 경우
    if (
      typeof error === "string" ||
      (error.response && typeof error.response.data === "string")
    ) {
      return Promise.reject({
        message: "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        error: null,
      });
    }

    // 서버가 JSON 에러 보내는 경우
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    // 네트워크 오류
    return Promise.reject({
      message: "네트워크 오류가 발생했습니다.",
    });
  }
);

export default api;