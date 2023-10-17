import { Button, TextField, InputAdornment, IconButton, Typography } from "@mui/material";
import logo from "../../assets/images/logo .png";
import "./Style/LoginTwo.css";
import { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormikProvider, useFormik } from "formik/dist";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";

const LoginTwo = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();
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

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Mot de passe est obligatoire"),
    }),
    onSubmit: async (values) => {
      await login(values)
        .unwrap()
        .then(() => {
          showSnackbar("You logged In successfully", "success");
          navigate("/Chatbot");
        })
        .catch((error) => {
          showSnackbar("Login failed. Please try again.", "error");
        });
    },
  });

  const { errors, touched, handleSubmit, handleChange, values } = formik;

  return (
    <div className="login-page-container">
      <div className="login-container">
        <div className="login-form-container">
          <FormikProvider value={formik}>
            <form className="login-form-flex" onSubmit={handleSubmit}>
              <AccountCircleOutlinedIcon
                sx={{ fontSize: "4rem", color: "#222" }}
                className="icon-login"
              />
              <p className="lf-text">Login</p>
              {responseError && (
                <p className="lf-text-error">
                  <ErrorOutlineOutlinedIcon sx={{ color: "red" }} />
                  {responseError}
                </p>
              )}
              <TextField
                label="Username"
                variant="outlined"
                id="username"
                type="text"
                onChange={handleChange}
                value={values.username}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && errors.username}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{ opacity: 0, visibility: "hidden" }}
                        edge="end"
                      >
                        <VisibilityOff
                          sx={{ opacity: 0, visibility: "hidden" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
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
                Login
              </Button>
              <Typography variant="body2" sx={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                Don't have an account? 
                <span className="create-account" onClick={() => navigate('/register')}>
                  Create an account
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
            </form>
          </FormikProvider>
        </div>
      </div>
      <div className="copyright">
        &copy; 2023 AiAutomationAgency. All rights reserved.
      </div>
    </div>
  );
};

export default LoginTwo;
