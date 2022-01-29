import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  items: [
    { id: 1, route: "/", text: "Home" },
    { id: 2, route: "/about", text: "About" },
    { id: 3, route: "/topics", text: "Topics" },
  ],
};

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.toggle = !state.toggle;
    },
    getMenuItems: (state) => {
      return state.items;
    }
  }
});

export const { toggleMenu } = menuSlice.actions;
export default menuSlice.reducer;
