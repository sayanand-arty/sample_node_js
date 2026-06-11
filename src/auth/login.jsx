import "./login.css";
import loginImage from "./images.jpg/images.jpg";
import authService from "../services/authService";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = async () => {
    try {
      const result = await authService.login(name, pass);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-container">
      <div className="box">

        <div className="leftside">
          <img src={loginImage} alt="welcome" />

          <h1>Welcome</h1>

          <p>
            This is a website which shows how a login page works made up of React.
          </p>
        </div>

        <div className="rightside">
          <h3>User Login</h3>

          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <button onClick={handleSubmit}>
            LOGIN
          </button>

          <p className="signup-text">
            Don't have an account?
          </p>

          <Link to="/signup" id="one">
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;