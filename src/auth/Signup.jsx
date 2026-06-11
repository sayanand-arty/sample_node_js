import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import authService from "../services/authService";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignup = async () => {
  try {
    const result = await authService.signup(
      name,
      email,
      pass
    );

    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="page-container">
      <div className="signup-box">
        <h1>Sign Up</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />

        <button onClick={handleSignup}>
          Sign Up
        </button>

        <Link to="/login" className="login-link">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
}

export default Signup;