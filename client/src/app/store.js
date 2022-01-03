import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "../slices/topic.slice";
import discussionReducer from "../slices/discussion.slice";
import menuReducer from "../slices/menu.slice";
import loginReducer from "../slices/login.slice";

const reducer = {
  topics: topicReducer,
  discussions: discussionReducer,
  menu: menuReducer,
  login: loginReducer
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
