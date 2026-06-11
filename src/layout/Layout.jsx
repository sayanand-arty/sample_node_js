import "./layout.css";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div id="header">
        <div className="nav-links">
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Layout;