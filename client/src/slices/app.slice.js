import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    renderApp: (state) => {
      state.loading = false;
    }
  },
});

export const { renderApp } = appSlice.actions;
export default appSlice.reducer;
