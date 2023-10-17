import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numberOfcake: 30
};

const CakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    byCake: (state, Action) => {
      state.numberOfcake -= Action.payload;
    },
    restock: (state, Action) => {
      state.numberOfcake += Action.payload;
    }
  }
});

module.exports = CakeSlice.reducer;
module.exports.cakeActions = CakeSlice.actions;
