import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TopicDataService from "../service/topic.service";

const initialState = {
  topics: [],
  topic: {},
  isLoading: true,
  isError: null
}

export const retrieveTopics = createAsyncThunk(
  "topics/retrieve", 
  async (_, { rejectWithValue }) => {
  try {
    const res = await TopicDataService.getALLTopics();
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const retrieveTopicByUrl = createAsyncThunk(
  "topics/retrieveUrl",
  async (url, { rejectWithValue }) => {
    try {
      const res = await TopicDataService.getTopicByUrl(url);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createTopic = createAsyncThunk(
  "topics/create",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      const res = await TopicDataService.create({ title, description });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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
    // all-topics
    [retrieveTopics.fulfilled]: (state, action) => {
      state.isLoading = false;
      for (const topic of action.payload) {
        state.topics.push(topic);
      }
    },
    [retrieveTopics.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action)
    },
    [retrieveTopics.pending]: (state, action) => {
      state.isLoading = true;
    },
    // url-topic
    [retrieveTopicByUrl.fulfilled]: (state, action) => {
      state.topic = action.payload;
    },
    // create-topic
    [createTopic.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

// export reducers
export const { setCurrentTopic } = topicSlice.actions;

const { reducer } = topicSlice;
export default reducer;
