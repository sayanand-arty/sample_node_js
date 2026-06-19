import api from "./api";

const authService = {
  signup: async ({ name, email, pass }) => {
    const res = await api.post("/signup", {
      name,
      email,
      pass,
    });
    if (!res.data?.success) {
      throw new Error(res.data?.message || "Signup failed");
    }
    return res.data.data;
  },

  login: async ({ email, password }) => {
    const res = await api.post("/login", {
      email,
      pass: password,
    });
    if (!res.data?.success) {
      throw new Error(res.data?.message || "Login failed");
    }
    return res.data.data;
  },

  getMe: async () => {
    const res = await api.get("/auth/me");
    if (!res.data?.success) {
      throw new Error(res.data?.message || "Failed to load authenticated user");
    }
    return res.data.data;
  },
};

export default authService;