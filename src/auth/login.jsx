import "./login.css";
import loginImage from "./images.jpg/images.jpg";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await login({ email: values.email, password: values.password });
        navigate("/dashboard");
      } catch (error) {
        setStatus(error?.response?.data?.message || error?.message || "Login failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="page-container">
      <div className="box">
        <div className="leftside">
          <img src={loginImage} alt="welcome" />
          <h1>Welcome</h1>
          <p>This is a website which shows how a login page works made up of React.</p>
        </div>

        <div className="rightside">
          <h3>User Login</h3>

          {formik.status && <p className="error">{formik.status}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && <p className="error">{formik.errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && <p className="error">{formik.errors.password}</p>}

          <button type="button" onClick={formik.handleSubmit} disabled={formik.isSubmitting || loading}>
            {loading ? "Signing in..." : "LOGIN"}
          </button>

          <p className="signup-text">Don't have an account?</p>

          <Link to="/signup" id="one">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;