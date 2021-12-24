import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = menuSlice.actions
export default menuSlice.reducer;
