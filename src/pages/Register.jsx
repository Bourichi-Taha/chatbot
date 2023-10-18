import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import logo from "../assets/images/logo .png";
import "../assets/css/register.css";
import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormikProvider, useFormik } from "formik/dist";
import * as Yup from "yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { motion } from "framer-motion";
  import { useRegisterMutation } from "../features/auth/authApiSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [responseError, setResponseError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        await register(values).unwrap();
        showSnackbar("You registered successfully", "success");
        navigate("/Login");
      } catch (error) {
        showSnackbar("Registration failed. Please try again.", "error");
      }
    },
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  return (
    <div className="register-page-container">
      <div className="login-container">
        <motion.div
          initial={{ flex: 1, width: "100%" }}
          animate={{ flex: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
          className="login-logo-container"
        >
          <motion.img
            initial={{ scale: 3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
            src={logo}
            alt=""
            className="login-logo"
          />
        </motion.div>
        <motion.div
          initial={{ flex: 0, width: 0 }}
          animate={{ flex: 0.7, width: "100%" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="login-form-container"
        >
          <FormikProvider value={formik}>
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeIn" }}
              className="login-form-flex"
              onSubmit={handleSubmit}
            >
              <AccountCircleOutlinedIcon
                sx={{ fontSize: "4rem", color: "#222" }}
                className="icon-login"
              />
              <p className="lf-text">Register</p>

              {responseError && (
                <p className="lf-text-error">
                  <ErrorOutlineOutlinedIcon sx={{ color: "red" }} />
                  {responseError}
                </p>
              )}

              <TextField
                className="TextField"
                label="Email"
                variant="outlined"
                id="email"
                type="email"
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                sx={{ }}
              />

              <TextField
                className="TextField"
                label="Username"
                variant="outlined"
                id="username"
                type="text"
                onChange={handleChange}
                value={values.username}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
              />

              <TextField
                className="TextField"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleChange}
                value={values.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />

              <Button
                className="Button"
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
              <Typography
                variant="body2"
                sx={{ marginTop: "1rem", fontSize: "0.9rem" }}
              >
                Already have an account?
                <span
                  className="create-account"
                  onClick={() => { navigate("/Login") }} >
                
                  Log in here
                </span>
              </Typography>

              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert
                  onClose={() => setOpenSnackbar(false)}
                  severity={snackbarSeverity}
                  sx={{ width: "100%" }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </motion.form>
          </FormikProvider>
        </motion.div>
      </div>
      <div className="copyright">
        &copy; 2023 AiAutomationAgency. All rights reserved.
      </div>
    </div>
  );
};

export default Register;
