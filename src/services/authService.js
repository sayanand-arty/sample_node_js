import api from "./api";

const authService = {

  signup: async (name, email, pass) => {
    try {
      const res = await api.post(
        "/signup",
        {
          name,
          email,
          pass,
        }
      );

      return res.data;

    } catch (err) {
      console.log(err);

      throw err;
    }
  },

  login: async (name, pass) => {
    try {
      const res = await api.post(
        "/login",
        {
          name,
          pass,
        }
      );

      return res.data;

    } catch (err) {
      console.log(err);

      throw err;
    }
  },
};

export default authService;