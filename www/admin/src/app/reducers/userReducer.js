import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../config/api";
import agent from "../../libs/agent";
import { message } from "antd";
import _ from "lodash";
const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setUser: (state, action) => {
      _.assignIn(state, action.payload);
    },
    resetUser: (state) => {
      _.assignIn(state, {
        _id: null,
        fullName: null,
        role: null,
        email: null,
        username: null,
        active: false,
        address: null,
        phone: null,
      });
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const fetchUser = () => async (dispatch, getState) => {
  try {
    const response = await agent.get(`${api.auth}/profile`);
    const data = _.get(response, "data.data");
    if (data) {
      dispatch(setUser(data));
      return true;
    }
  } catch (error) {
    return false;
  }
};

export default userSlice.reducer;
