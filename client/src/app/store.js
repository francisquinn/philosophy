import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "../slices/topic.slice";
import menuReducer from "../slices/menu.slice";

const reducer = {
  topics: topicReducer,
  menu: menuReducer,
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
