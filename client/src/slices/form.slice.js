import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  inputs: {}
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormInput: (state, data) => {
      state.inputs[data.payload.name] = data.payload.value;
    },
    resetForm: (state) => {
      state.inputs = initialState.inputs;
    }
  }
});

export const { resetForm, addFormInput } = formSlice.actions;
export default formSlice.reducer;
