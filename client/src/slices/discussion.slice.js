import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DiscussionDataService from "../service/discussion.service";
import axios from "axios";

const initialState = {
  list: {},
  current: {},
  topic: null,
  retrieved: []
};

export const retrieveTopicDiscussions = createAsyncThunk(
  "discussions/retieveTopicDiscussions",
  async ({ topic_url, signal }, {rejectWithValue }) => {
    try {
      const res = await DiscussionDataService.getTopicDiscussions(topic_url, signal);
      return res.data;
    } catch(err) {
      if(axios.isCancel(err)) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const retrieveDiscussionByUrl = createAsyncThunk(
  "discussions/retieveByUrl",
  async ({ topic_url, discussion_url, signal }, { rejectWithValue }) => {
    try {
      const res = await DiscussionDataService.getDiscussionByUrl(
        topic_url,
        discussion_url,
        signal
      );
      return res.data;
    } catch (err) {
      if(axios.isCancel(err)) {
        return rejectWithValue(err.message);
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export const createTopicDiscussion = createAsyncThunk(
  "discussions/create",
  async (form, { rejectWithValue }) => {
    try {
      const res = await DiscussionDataService.createTopicDiscussion(form.inputs);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateTopicDiscussion = createAsyncThunk(
  "discussions/update",
  async (form, { rejectWithValue }) => {
    try {
      const res = await DiscussionDataService.updateTopicDiscussion(form.inputs);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteTopicDiscussion = createAsyncThunk(
  "discussions/delete",
  async ({ discussion_id, topic_url }, { rejectWithValue }) => {
    try {
      const res = await DiscussionDataService.deleteTopicDiscussion({
        discussion_id: discussion_id,
        topic_url: topic_url
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers : {
    setCurrentDiscussion: (state, action) => {
      state.current = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.topic = action.payload;
    }
  },
  extraReducers: {
    // all-discussions
    [retrieveTopicDiscussions.fulfilled]: (state, action) => {
      const response = action.payload;
      // check if empty response
      if (response.discussions.length === 0) {
        state.retrieved.push(action.meta['arg'].topic_url);
        return;
      }
      // retrieved topic discussions
      state.retrieved.push(response.topic_url);
      // add topic discussions to list
      state.list[response.topic_url] = response.discussions;
      
    },
    [retrieveTopicDiscussions.rejected]: (state, action) => {
      console.log(action.payload)
    },
    // create-discussion
    [createTopicDiscussion.fulfilled]: (state, action) => {
      const discussion = action.payload.discussion;
      for (const topic of state.list) {
        if (topic.hasOwnProperty(discussion.topic_id)) {
          topic[discussion.topic_id].push(discussion)
        } else {
          let discuss = {}
          discuss[discussion.topic_id] = discussion;
          state.list.push(discuss);
        }
      }
    },
    // url-discussion
    [retrieveDiscussionByUrl.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    // delete-discussion
    [deleteTopicDiscussion.fulfilled]: (state) => {
      if (state.list.length !== 0) {
        state.list = state.list.filter(discussion => discussion._id !== state.current._id);
      } 
      state.current = {};
    },
    //update-discussion
    [updateTopicDiscussion.fulfilled]: (state, action) => {
      if (state.list.length !== 0) {
        const index = state.list.findIndex(discussion => discussion._id === state.current._id);
        state.list[index] = action.payload.discussion;
      }
      state.current = action.payload.discussion;
    },
    [updateTopicDiscussion.rejected]: (state, action) => {
      console.log(action.payload)
    }
  },
});

// export reducers
export const { setCurrentDiscussion, setCurrentTopic } = discussionSlice.actions;

const { reducer } = discussionSlice;
export default reducer;
