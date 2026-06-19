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
  },

  updateIncome: async (
    id,
    title,
    amount
  ) => {

    const res = await api.put(
      `/income/${id}`,
      {
        title,
        amount
      }
    );

    return res.data;
  },

  deleteIncome: async (
    id
  ) => {

    const res = await api.delete(
      `/income/${id}`
    );

    return res.data;
  }

};

export default incomeService;