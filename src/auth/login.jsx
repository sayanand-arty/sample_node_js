import "./login.css";
import loginImage from "./images.jpg/images.jpg";
import authService from "../services/authService";

import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

const loginSchema = Yup.object({
  name: Yup.string()
    .required("Username is required"),

  pass: Yup.string()
    .required("Password is required")
});

function Login() {

  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      name: "",
      pass: ""
    },

    validationSchema: loginSchema,

    onSubmit: async (values) => {

      try {

        const result =
          await authService.login(
            values.name,
            values.pass
          );

        if (result.success) {

          localStorage.setItem(
            "user",
            JSON.stringify(result.user)
          );

          alert(result.message);

          navigate("/dashboard");
        }

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

      <div className="box">

        <div className="leftside">

          <img
            src={loginImage}
            alt="welcome"
          />

          <h1>Welcome</h1>

          <p>
            This is a website which shows how a login page works made up of React.
          </p>

        </div>

        <div className="rightside">

          <h3>User Login</h3>

          <input
            type="text"
            name="name"
            placeholder="Username"
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
            LOGIN
          </button>

          <p className="signup-text">
            Don't have an account?
          </p>

          <Link
            to="/signup"
            id="one"
          >
            Sign Up
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;