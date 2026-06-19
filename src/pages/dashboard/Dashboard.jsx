import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import expenseService from "../../services/expenseService";
import { useAuth } from "../../context/AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import incomeService from "../../services/incomeService";

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");
  const [incomes, setIncomes] = useState([]);
  const [incomeEditId, setIncomeEditId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalTransactions = expenses.length;
  const totalSavings = totalIncome - totalExpenses;

  localStorage.setItem(
    "dashboardStats",
    JSON.stringify({ totalIncome, totalExpenses, totalSavings })
  );

  const chartData = [];
  expenses.forEach((item) => {
    const existing = chartData.find((data) => data.name === item.category);
    if (existing) {
      existing.value += Number(item.amount);
    } else {
      chartData.push({ name: item.category, value: Number(item.amount) });
    }
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF4560"];

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
      return;
    }

    loadExpenses();
    loadIncome();
  }, [loading, user]);

  const loadExpenses = async () => {
    try {
      const result = await expenseService.getExpenses(user._id);
      setExpenses(result.expenses);
    } catch (error) {
      console.log(error);
    }
  };

  const loadIncome = async () => {
    try {
      const result = await incomeService.getIncome(user._id);
      setIncomes(result.income);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditExpense = (item) => {
    setEditId(item._id);
    setTitle(item.title);
    setAmount(item.amount);
    setCategory(item.category);
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      const result = await expenseService.deleteExpense(id);
      alert(result.message);
      loadExpenses();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditIncome = (item) => {
    setIncomeEditId(item._id);
    setIncomeTitle(item.title || "");
    setIncomeAmount(item.amount || "");
  };

  const handleDeleteIncome = async (id) => {
    if (!window.confirm("Delete this income?")) return;
    try {
      const result = await incomeService.deleteIncome(id);
      alert(result.message);
      loadIncome();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddIncome = async () => {
    if (!incomeTitle || !incomeAmount) {
      alert("Please fill all income fields");
      return;
    }

    try {
      const payload = {
        title: incomeTitle,
        amount: incomeAmount,
      };

      let result;
      if (incomeEditId) {
        result = await incomeService.updateIncome(incomeEditId, incomeTitle, incomeAmount);
      } else {
        result = await incomeService.addIncome(incomeTitle, incomeAmount, user._id);
      }

      alert(result.message);
      setIncomeTitle("");
      setIncomeAmount("");
      setIncomeEditId(null);
      loadIncome();
    } catch (error) {
      console.log(error);
      alert("Failed to save income");
    }
  };

  const handleAddExpense = async () => {
    if (!title || !amount || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      let result;
      if (editId) {
        result = await expenseService.updateExpense(editId, title, amount, category);
      } else {
        result = await expenseService.addExpense(title, amount, category, user._id);
      }

      alert(result.message);
      setTitle("");
      setAmount("");
      setCategory("");
      setEditId(null);
      loadExpenses();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        <div className="expense-form">
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
          </select>
          <button onClick={handleAddExpense}>{editId ? "Update Expense" : "Add Expense"}</button>
        </div>

        <div className="expense-form">
          <input
            type="text"
            placeholder="Income Title"
            value={incomeTitle}
            onChange={(e) => setIncomeTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Income Amount"
            value={incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
          />
          <button onClick={handleAddIncome}>{incomeEditId ? "Update Income" : "Add Income"}</button>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Total Expenses</h3>
            <p>₹{totalExpenses}</p>
          </div>
          <div className="card">
            <h3>Total Income</h3>
            <p>₹{totalIncome}</p>
          </div>
          <div className="card">
            <h3>Total Savings</h3>
            <p>₹{totalSavings}</p>
          </div>
          <div className="card">
            <h3>Transactions</h3>
            <p>{totalTransactions}</p>
          </div>
          <div className="card">
            <h3>Income Entries</h3>
            <p>{incomes.length}</p>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="chart-box">
            <h2>Expense Overview</h2>
            <BarChart width={700} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" />
            </BarChart>
          </div>

          <div className="recent-box">
            <h2>Recent Transactions</h2>
            <ul>
              {expenses.map((item) => (
                <li key={item._id} className="transaction-item">
                  <div className="transaction-info">
                    <h4>{item.title}</h4>
                    <span className="category-badge">{item.category}</span>
                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="transaction-actions">
                    <span className="amount">₹{item.amount}</span>
                    <button className="edit-btn" onClick={() => handleEditExpense(item)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteExpense(item._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="income-box">
            <h2>Income History</h2>
            <ul>
              {incomes.map((item) => (
                <li key={item._id} className="transaction-item">
                  <div className="transaction-info">
                    <h4>{item.title}</h4>
                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="transaction-actions">
                    <span className="amount">₹{item.amount}</span>
                    <button className="edit-btn" onClick={() => handleEditIncome(item)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteIncome(item._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pie-box">
            <h2>Expense Categories</h2>
            <PieChart width={350} height={250}>
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="summary-box">
            <h2>Summary</h2>
            <p>Total Expense : ₹{totalExpenses}</p>
            <p>Total Income : ₹{totalIncome}</p>
            <p>Total Savings : ₹{totalSavings}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
