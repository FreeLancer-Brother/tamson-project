import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";
const initialState = {};

export const emailAccountSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentEmail: (state, action) => {
      state.currentEmail = action.payload;
    },
    resetCurrentEmail: (state) => {
      state.currentEmail = null;
    },
  },
});

export const { setCurrentEmail, resetCurrentEmail } = emailAccountSlice.actions;

export default emailAccountSlice.reducer;
