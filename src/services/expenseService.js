import api from "./api";

const expenseService = {

  addExpense: async (
    title,
    amount,
    category,
    userId
  ) => {

    const res = await api.post(
      "/expense",
      {
        title,
        amount,
        category,
        userId
      }
    );

    return res.data;
  },

  getExpenses: async (userId) => {

    const res = await api.get(
      `/expense/${userId}`
    );

    return res.data;
  },

  deleteExpense: async (id) => {

    const res = await api.delete(
      `/expense/${id}`
    );

    return res.data;
  }

};

export default expenseService;