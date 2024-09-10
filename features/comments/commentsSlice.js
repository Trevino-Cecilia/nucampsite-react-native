import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../shared/baseUrl";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const response = await fetch(baseUrl + "comments");
    if (!response.ok) {
      return Promise.reject("Unable to fetch, status: " + response.status);
    }
    const data = await response.json();
    return data;
  }
);

export const postComment = createAsyncThunk(
  "comments/postComment",
  async (payload, { dispatch, getState }) => {
    setTimeout(() => {
      const { comments } = getState();
      payload.date = new Date().toISOString();
      payload.id = comments.commentsArray.length;
      dispatch(addComment(payload));
    }, 2000);
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: { commentsArray: [] },
  reducers: {
    addComment: (state, action) => {
      state.commentsArray.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.commentsArray = action.payload;
    });
  },
});

export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
