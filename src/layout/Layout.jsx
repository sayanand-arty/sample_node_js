import "./layout.css";
import { Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartPie,
  FaUser
} from "react-icons/fa";

function Layout() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="app-layout">

      <div className="sidebar">

        <div className="user-box">

          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

        </div>

        <div className="menu">

          <div
            className="menu-item"
            onClick={() => navigate("/home")}
          >
            <FaHome />
            <span>Home</span>
          </div>

          <div
            className="menu-item"
            onClick={() => navigate("/dashboard")}
          >
            <FaChartPie />
            <span>Dashboard</span>
          </div>

          <div
            className="menu-item"
            onClick={() => navigate("/profile")}
          >
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

      <div className="page-content">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;