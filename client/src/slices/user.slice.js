import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserDataService from "../service/user.service";

const initialState = {
  info: {},
  window: false,
  register: false,
  login: false,
  isLoggedIn: false,
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (form, { rejectWithValue }) => {
    try {
      const res = await UserDataService.login(form.inputs);
      return res.data;
    } catch(err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/register",
  async (form, { rejectWithValue }) => {
    try {
      const res = await UserDataService.register(form.inputs);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkUserLoggedStatus = createAsyncThunk(
  "user/status",
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserDataService.checkUserLoggedStatus();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await UserDataService.logout();
      return res.data;
    } catch(err) {
      return rejectWithValue(err.response.data);
    }

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
    },
    userLoggedState: (state, status) => {
      state.isLoggedIn = status.payload;
    }
  },
  extraReducers: {
    [checkUserLoggedStatus.fulfilled]: (state, action) => {
      state.info = action.payload;
    },
  }
});

export const { toggleLoginWindow, toggleRegisterWindow, userLoggedState } = userSlice.actions;
export default userSlice.reducer;
