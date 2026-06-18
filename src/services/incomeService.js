import api from "./api";

const incomeService = {

  addIncome: async (
    title,
    amount,
    userId
  ) => {

    const res = await api.post(
      "/income",
      {
        title,
        amount,
        userId
      }
    );

    return res.data;
  },

  getIncome: async (
    userId
  ) => {

    const res = await api.get(
      `/income/${userId}`
    );

    return res.data;
  }

};

export default incomeService;