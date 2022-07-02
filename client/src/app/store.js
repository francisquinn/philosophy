import { configureStore } from "@reduxjs/toolkit";
import topicReducer from "../slices/topic.slice";
import discussionReducer from "../slices/discussion.slice";
import menuReducer from "../slices/menu.slice";
import userReducer from "../slices/user.slice";
import popupReducer from "../slices/popup.slice";
import formReducer from "../slices/form.slice";

const reducer = {
  topics: topicReducer,
  discussions: discussionReducer,
  menu: menuReducer,
  user: userReducer,
  popup: popupReducer,
  form: formReducer
};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});
