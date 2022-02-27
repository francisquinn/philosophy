import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TopicDataService from "../service/topic.service";

const initialState = {
  topics: [],
  topic: {},
  isLoading: true,
  isError: null
}

export const retrieveTopics = createAsyncThunk("topics/retrieve", async () => {
  const res = await TopicDataService.getALLTopics();
  return res.data;
});

export const retrieveTopicByUrl = createAsyncThunk(
  "topics/retrieveUrl",
  async (url) => {
    const res = await TopicDataService.getTopicByUrl(url);
    return res.data;
  }
);

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
  reducers: {
    setCurrentTopic: (state, action) => {
      state.topic = action.payload;
    }
  },
  extraReducers: {
    [retrieveTopics.fulfilled]: (state, action) => {
      state.isLoading = false;
      for (const topic of action.payload) {
        state.topics.push(topic);
      }
    },
    [retrieveTopicByUrl.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retrieveTopicByUrl.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.topic = action.payload;
      //return action.payload;
    },
    [createTopic.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

// export reducers
export const { setCurrentTopic } = topicSlice.actions;

const { reducer } = topicSlice;
export default reducer;
