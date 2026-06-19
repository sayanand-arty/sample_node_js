import api from "../../../api/axios";

const authApi = {
  signup: async (payload) => {
    const response = await api.post("/auth/signup", payload);
    return response.data;
  },

  login: async (payload) => {
    const response = await api.post("/auth/login", payload);
    return response.data;
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};

export default authApi;
