import { TOKEN_NAME } from "../config/constants";
export const getToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setToken = (value) => {
  return localStorage.setItem(TOKEN_NAME, value);
};
