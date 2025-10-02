import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";
const initialState = {
  activeKey: "1",
  saving: false,
};

export const configReducer = createSlice({
  name: "config",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setActiveKey: (state, action) => {
      state.activeKey = action.payload;
    },
    setSaving: (state, action) => {
      state.saving = action.payload;
    },
  },
});

export const { setActiveKey, setSaving } = configReducer.actions;

export default configReducer.reducer;
