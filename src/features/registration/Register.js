import { Button, TextField, Typography } from "@mui/material";
import logo from "../../assets/images/logo .png";
import "../Login/Style/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      // Handle registration functionality here
      // On successful registration, maybe navigate to the login page?
      navigate("/login");
    },
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  return (
    <div className="login-page-container">
      <div className="login-container">
        <div className="login-logo-container">
          <img src={logo} alt="" className="login-logo" />
        </div>
        <div className="login-form-container">
          <form className="login-form-flex" onSubmit={handleSubmit}>
          <p className="lf-text">Sign up</p>

            <TextField
              label="Username"
              variant="outlined"
              id="register-username"
              type="text"
              onChange={handleChange}
              value={values.username}
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <TextField
              label="Password"
              variant="outlined"
              id="register-password"
              type="password"
              onChange={handleChange}
              value={values.password}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              id="confirmPassword"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword}
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            <Button
              type="submit"
              variant="outlined"
              sx={{
                color: "#222",
                borderColor: "#222",
                fontSize: "1rem",
                fontWeight: "bold",
                letterSpacing: ".2rem",
                ":hover": {
                  borderColor: "#ef6a36",
                  color: "#f9f1fe",
                  bgcolor: "#ef6a36",
                  scale: "1.1",
                },
                transition: "all .3s ease",
              }}
            >
              Register
            </Button>
            <Typography variant="body2" sx={{ marginTop: "1rem" }}>
              Already have an account?
              <span
                className="create-account"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </Typography>
          </form>
        </div>
      </div>
      <div className="copyright">
        &copy; 2023 AiAutomationAgency. All rights reserved.
      </div>
    </div>
  );
};

export default Register;
