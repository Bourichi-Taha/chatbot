import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
 // Inside authSlice.js
reducers: {
  setCredentials: (state, action) => {
    console.log("Inside setCredentials reducer", action.payload);
    state.token = action.payload;
  },
  logOut: state => {
    state.token = null;
  }
}
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
