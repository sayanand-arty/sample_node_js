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
  }
};

export default expenseService;