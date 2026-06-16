import { Link, useNavigate } from "react-router-dom";

import "./login.css";

import authService from "../services/authService";

import { useFormik } from "formik";
import * as Yup from "yup";

const signupSchema = Yup.object({

  name: Yup.string()
    .min(3, "Minimum 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  pass: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")

});

function Signup() {

  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      name: "",
      email: "",
      pass: ""
    },

    validationSchema: signupSchema,

    onSubmit: async (values) => {

      try {

        const result =
          await authService.signup(
            values.name,
            values.email,
            values.pass
          );

        alert(result.message);

        navigate("/login");

      } catch (error) {

        if (error.response) {
          alert(
            error.response.data.message
          );
        }

        console.log(error);
      }

    }

  });

  return (
    <div className="page-container">

      <div className="signup-box">

        <h1>Sign Up</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.name &&
          formik.errors.name && (
            <p className="error">
              {formik.errors.name}
            </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email &&
          formik.errors.email && (
            <p className="error">
              {formik.errors.email}
            </p>
        )}

        <input
          type="password"
          name="pass"
          placeholder="Password"
          value={formik.values.pass}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.pass &&
          formik.errors.pass && (
            <p className="error">
              {formik.errors.pass}
            </p>
        )}

        <button
          onClick={formik.handleSubmit}
        >
          Sign Up
        </button>

        <Link
          to="/login"
          className="login-link"
        >
          Already have an account? Log In
        </Link>

      </div>

    </div>
  );
}

export default Signup;