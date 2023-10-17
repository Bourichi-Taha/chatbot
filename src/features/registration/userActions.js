import axios from "axios";
import { registerStart, registerSuccess, registerFail } from "./userSlice";

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axios.post("http://127.0.0.1:8000/register/", userData);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFail(error.response?.data || "Unknown error"));
  }
};
