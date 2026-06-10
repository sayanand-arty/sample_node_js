import { useState } from "react";

function Signup({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleSignup = () => {
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", pass);
  };

  return (
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

      <p
        style={{
          cursor: "pointer",
          color: "blue",
          marginTop: "10px"
        }}
        onClick={() => setPage("login")}
      >
        Already have an account? Log In
      </p>
    </div>
  );
}

export default Signup;