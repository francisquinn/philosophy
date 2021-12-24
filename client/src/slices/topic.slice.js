import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TopicDataService from "../service/topic.service";

const initialState = {
  values: [],
  status: "idle",
  error: null,
};

export const retrieveTopics = createAsyncThunk("topics/retrieve", async () => {
  const res = await TopicDataService.getALLTopics();
  return res.data;
});

export const createTopic = createAsyncThunk(
  "topics/create",
  async ({ title, description }) => {
    const res = await TopicDataService.create({ title, description });
    return res.data;
  }
);

const topicSlice = createSlice({
  name: "topic",
  initialState,
  extraReducers: {
    [retrieveTopics.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [createTopic.pending]: (state, action) => {
      state.status = "loading";
    },
    [createTopic.fulfilled]: (state, action) => {
      state.status = "idle";
      state.values.push(action.payload);
    },
  },
});

const { reducer } = topicSlice;
export default reducer;
