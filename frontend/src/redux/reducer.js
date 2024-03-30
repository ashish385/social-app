import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./userSlice";

import postSlice from "./postSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  user: userSlice,
  posts: postSlice,
  auth:authSlice
});

export { rootReducer };
