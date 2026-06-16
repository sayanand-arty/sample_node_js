import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartPie,
  FaUser
} from "react-icons/fa";

function Dashboard() {
const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem("user");

  navigate("/login");
};
  return (
    <div className="dashboard">

      <div className="sidebar">

        <div className="user-box">
          <div className="avatar">
            S
          </div>

          <h2>Sayanand</h2>

          <p>smp@gmail.com</p>
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

  <div className="cards">

    <div className="card">
      <h3>Total Expenses</h3>
      <p>₹12,450</p>
    </div>

    <div className="card">
      <h3>Total Income</h3>
      <p>₹25,000</p>
    </div>

    <div className="card">
      <h3>Total Savings</h3>
      <p>₹12,550</p>
    </div>

    <div className="card">
      <h3>Transactions</h3>
      <p>28</p>
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
        <li>Food - ₹500</li>
        <li>Travel - ₹1000</li>
        <li>Shopping - ₹1500</li>
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

      <p>Total Income : ₹25,000</p>
      <p>Total Expense : ₹12,450</p>
      <p>Total Savings : ₹12,550</p>
    </div>

  </div>

</div>

    </div>
  );
}

export default Dashboard;