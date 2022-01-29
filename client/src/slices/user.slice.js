import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserDataService from "../service/user.service";

const initialState = {
  window: false,
  register: false,
  login: false,
  isLoggedIn: false,
  isLoggedOut: false,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const res = await UserDataService.login({
      email: email,
      password: password,
    });
    return res.data;
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async ({ firstName, lastName, username, email, password }) => {
    const res = await UserDataService.register({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
    })
    .catch((err) => {
      return err.response;
    })
  
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleLoginWindow: (state) => {
      state.window = !state.window;
      state.login = !state.login;
    },
    toggleRegisterWindow: (state) => {
      state.window = !state.window;
      state.register = !state.register;
    }
  },
});

export const { toggleLoginWindow, toggleRegisterWindow } = userSlice.actions;
export default userSlice.reducer;
