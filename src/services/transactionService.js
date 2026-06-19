import api from "./api";

const transactionService = {
  getTransactions: async (userId) => {
    const res = await api.get(`/transactions/${userId}`);
    return res.data;
  },
};

export default transactionService;
