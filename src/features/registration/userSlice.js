import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.userInfo = action.payload;
    },
    registerFail: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const { registerStart, registerSuccess, registerFail } = userSlice.actions;

export default userSlice.reducer;
