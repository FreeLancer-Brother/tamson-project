import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import emailAccountReducer from "./reducers/emailAccountReducer";
import configReducer from "./reducers/configReducer";
export const store = configureStore({
  reducer: {
    user: userReducer,
    emailAccount: emailAccountReducer,
    config: configReducer,
  },
});
