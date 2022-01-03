import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserDataService from "../service/user.service"

const initialState = {
  window: false,
  register: false,
  login: false,
  isLoggedIn: false,
  isLoggedOut: false
};

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const res = await UserDataService.login({ email, password });
    return res.data;
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    toggleLoginWindow: (state) => {
      state.window = !state.window;
      state.login = !state.login;
    },
    toggleRegisterWindow: (state) => {
      state.login = !state.login;
      state.register = !state.register;
    }
  },
});

export const { toggleLoginWindow, toggleRegisterWindow } = loginSlice.actions;
export default loginSlice.reducer;
