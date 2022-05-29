import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: false,
  items: [
    { id: 1, route: "/", text: "Discover" },
    { id: 2, route: "/topics", text: "Topics" },
    { id: 3, route: "/books", text: "Books" },
    { id: 4, route: "/philosophers", text: "Philosophers" },
  ],
  footerItems: [
    { id: 1, route: "/", text: "Discover" },
    { id: 2, popup: true, component: "CREATE", text: "Create" },
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
