import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts(state, action) {
      state.posts = action.payload;
    },
  },
});

export const {getPosts} =  postSlice.actions;

// Reducer

export default postSlice.reducer;
