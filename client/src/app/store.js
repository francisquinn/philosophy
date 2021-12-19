import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "../slices/topics";

const reducer = {
  topics: topicReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

