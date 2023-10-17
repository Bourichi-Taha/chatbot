import {
    Button, TextField, InputAdornment,
    IconButton,
} from "@mui/material";
import logo from "../assets/images/logo .png";
import "../assets/css/login.css"
import { useState } from "react";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    // Define a function to handle toggling the showPassword state
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return (
        <div className="login-page-container">
            <div className="login-container">
                <motion.div
                    initial={{ flex: 1, width: "100%" }} // Initial state (hidden)
                    animate={{ flex: .3 }} // Animate to this state (visible)
                    transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }} // Animation duration
                    className="login-logo-container">
                    <motion.img
                        initial={{ scale: 3 }} // Initial state (hidden)
                        animate={{ scale: 1 }} // Animate to this state (visible)
                        transition={{ duration: 0.5, delay: .4, ease: "easeIn" }} // Animation duration
                        src={logo} alt="" className="login-logo" />
                </motion.div>
                <motion.div
                    initial={{ flex: 0, width: 0 }} // Initial state (hidden)
                    animate={{ flex: .7, width: "100%" }} // Animate to this state (visible)
                    transition={{ duration: 0.5, delay: 0.6 }} // Animation duration
                    className="login-form-container">

                    <motion.form
                        initial={{ opacity: 0 }} // Initial state (hidden)
                        animate={{ opacity: 1 }} // Animate to this state (visible)
                        transition={{ duration: 0.5, delay: 0.6, ease: "easeIn" }} // Animation duration
                        className="login-form-flex" >
                        <AccountCircleOutlinedIcon sx={{ fontSize: "4rem", color: "#343e8b" }} className="icon-login" />
                        <p className="lf-text">SIGN IN</p>
                        {/* {responseError && <p className="lf-text-error"><ErrorOutlineOutlinedIcon sx={{ color: "red" }} />{responseError}</p>} */}
                        {/* {responseSuccess && <p className="lf-text-success"><CheckCircleOutlineOutlinedIcon sx={{ color: "green" }} />{responseSuccess}</p>} */}
                        <TextField label="Username" variant="outlined"
                            id="username"
                            type="text"
                            
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton sx={{ opacity: 0, visibility: "hidden" }} edge="end">
                                            <VisibilityOff sx={{ opacity: 0, visibility: "hidden" }} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField label="Password" variant="outlined" type={showPassword ? "text" : "password"}
                            id="password"
                             InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowPassword} edge="end">
                                            {showPassword ? (
                                                <Visibility />
                                            ) : (
                                                <VisibilityOff />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button type="submit" variant="outlined" sx={{ color: "#343e8b", borderColor: "#343e8b", fontSize: "1rem", fontWeight: "bold", letterSpacing: ".2rem", ":hover": { color: "#f9f1fe", bgcolor: "#343e8b", scale: "1.1" }, transition: "all .3s ease" }}>Login</Button>
                    </motion.form>
                </motion.div>
            </div>
            <div className="copyright" onClick={() => { navigate("/projects") }}>&copy; 2023 AiAutomationAgency. All rights reserved.</div>
        </div>
    )
}

export default Login