import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
reducers: {
  setCredentials: (state, action) => {
    state.token = action.payload;
    localStorage.setItem("token", action.payload);
  },
  logOut: state => {
    state.token = null;
    localStorage.removeItem("token"); 
  }
}
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;