import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const signupSchema = Yup.object({
  name: Yup.string().min(3, "Minimum 3 characters").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

function Signup() {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      try {
        await signup({
          name: values.name,
          email: values.email,
          pass: values.password,
        });
        navigate("/dashboard");
      } catch (error) {
        setStatus(error?.response?.data?.message || error?.message || "Signup failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="page-container">
      <div className="signup-box">
        <h1>Sign Up</h1>

        {formik.status && <p className="error">{formik.status}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && <p className="error">{formik.errors.name}</p>}

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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <p className="error">{formik.errors.confirmPassword}</p>
        )}

        <button type="button" onClick={formik.handleSubmit} disabled={formik.isSubmitting || loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <Link to="/login" className="login-link">
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
}

export default Signup;