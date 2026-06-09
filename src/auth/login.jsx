import "./login.css";
import loginImage from "./images.jpg/images.jpg";
import authService from "./services/authService";
import { useState } from "react";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handlePass = (e) => {
    setPass(e.target.value);
  };

  const handleLogin = () => {
    // console.log("Username:", name);
    // console.log("Password:", pass);
  };
  const handleSubmit=()=>{
    authService.login(name,pass)
  }
  return (
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
          onChange={handleName}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={handlePass}
        />

        <button onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
}

export default Login;