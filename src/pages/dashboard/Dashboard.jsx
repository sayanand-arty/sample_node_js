import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import expenseService from "../../services/expenseService";
import {
  FaHome,
  FaChartPie,
  FaUser
} from "react-icons/fa";

function Dashboard() {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);
  const totalExpenses = expenses.reduce(
  (sum, item) =>
    sum + Number(item.amount),
  0
);

const totalTransactions =
  expenses.length;

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

  if (!user) {
    navigate("/login");
    return;
  }

  loadExpenses();

}, []);
  const handleDeleteExpense =
  async (id) => {

  try {

    const result =
      await expenseService.deleteExpense(
        id
      );

    alert(result.message);

    loadExpenses();

  } catch (error) {

    console.log(error);

  }

};

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };
  const loadExpenses = async () => {

  try {

    const result =
      await expenseService.getExpenses(
        user._id
      );

    setExpenses(
      result.expenses
    );

  } catch (error) {

    console.log(error);

  }

};


    const handleAddExpense = async () => {

  if (
    !title ||
    !amount ||
    !category
  ) {

    alert(
      "Please fill all fields"
    );

    return;
  }

  try {

    const result =
      await expenseService.addExpense(
        title,
        amount,
        category,
        user._id
      );

    alert(result.message);

    setTitle("");
    setAmount("");
    setCategory("");

    loadExpenses();

  } catch (error) {

    console.log(error);

    alert(
      "Failed to add expense"
    );

  }

};
  return (
    <div className="dashboard">

      <div className="sidebar">

        <div className="user-box">

          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

        </div>

        <div className="menu">

          <div className="menu-item">
            <FaHome />
            <span>Home</span>
          </div>

          <div className="menu-item active">
            <FaChartPie />
            <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <FaUser />
            <span>Profile</span>
          </div>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      <div className="main-content">

        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {/* Expense Form */}

        <div className="expense-form">

          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

          <select
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>
  <option value="">
    Select Category
  </option>

  <option value="Food">
    Food
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Bills">
    Bills
  </option>

  <option value="Health">
    Health
  </option>

  <option value="Entertainment">
    Entertainment
  </option>

</select>

          <button
  onClick={handleAddExpense}
>
  Add Expense
</button>

        </div>

        <div className="cards">

  <div className="card">
    <h3>Total Expenses</h3>
    <p>₹{totalExpenses}</p>
  </div>

  <div className="card">
    <h3>Total Income</h3>
    <p>₹0</p>
  </div>

  <div className="card">
    <h3>Total Savings</h3>
    <p>₹{-totalExpenses}</p>
  </div>

  <div className="card">
    <h3>Transactions</h3>
    <p>{totalTransactions}</p>
  </div>

</div>

        <div className="dashboard-grid">

          <div className="chart-box">
            <h2>Expense Overview</h2>

            <div className="placeholder">
              Chart Coming Soon
            </div>
          </div>

          <div className="recent-box">
            <h2>Recent Transactions</h2>

<ul>

  {expenses.map((item) => (

    <li key={item._id}>

      {item.title}
      {" - ₹"}
      {item.amount}

      <button
        onClick={() =>
          handleDeleteExpense(
            item._id
          )
        }
      >
        Delete
      </button>

    </li>

  ))}

</ul>
          </div>

          <div className="pie-box">
            <h2>Expense Categories</h2>

            <div className="placeholder">
              Pie Chart
            </div>
          </div>

          <div className="summary-box">
  <h2>Summary</h2>

  <p>Total Income : ₹0</p>

  <p>
    Total Expense : ₹
    {totalExpenses}
  </p>

  <p>
    Total Savings : ₹
    {-totalExpenses}
  </p>

</div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;