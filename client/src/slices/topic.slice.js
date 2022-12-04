import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TopicDataService from "../service/topic.service";
import axios from "axios";

const initialState = {
  list: [],
  current: {},
  isLoading: true,
  isError: null
}

export const retrieveTopics = createAsyncThunk(
  "topics/retrieve", 
  async (signal, { rejectWithValue }) => {
  try {
    const res = await TopicDataService.getAllTopics(signal);
    return res.data;
  } catch (err) {
    if(axios.isCancel(err)) {
      return rejectWithValue(err.message);
    }
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
      state.current = action.payload;
    },
    addTopic: (state, action) => {
      state.list.push(action.payload);
    }
  },
  extraReducers: {
    // all-topics
    [retrieveTopics.fulfilled]: (state, action) => {
      state.isLoading = false;
      for (const topic of action.payload) {
        state.list.push(topic);
      }
    },
    [retrieveTopics.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action)
    },
    // url-topic
    [retrieveTopicByUrl.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    // create-topic
    [createTopic.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

// export reducers
export const { setCurrentTopic, addTopic } = topicSlice.actions;

const { reducer } = topicSlice;
export default reducer;
