import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  window: false,
  component: null,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopUpWindow: (state, data) => {
      state.component = data.payload.component;
      state.window = !state.window;
    },
    navigate: (state, data) => {
        state.component = data.payload.component;
    }
  }
});

export const { togglePopUpWindow, navigate } = popupSlice.actions;
export default popupSlice.reducer;
