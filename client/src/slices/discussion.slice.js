import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DiscussionDataService from "../service/discussion.service";

const initialState = {
  list: [],
  current: {},
  topic: null,
  retrieved: [],
  isLoading: true
};

export const retrieveTopicDiscussions = createAsyncThunk(
  "discussions/retieveTopicDiscussions",
  async (topic_url, {rejectWithValue }) => {
    try {
      const res = await DiscussionDataService.getTopicDiscussions(topic_url);
      return res.data;
    } catch(err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const retrieveDiscussionByUrl = createAsyncThunk(
  "discussions/retieveByUrl",
  async ({ topic_url, discussion_url }, { rejectWithValue }) => {
    try {
      const res = await DiscussionDataService.getDiscussionByUrl(
        topic_url,
        discussion_url
      );
      return res.data;
    } catch (err) {
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
      for (const discussion of action.payload) {
        let discuss = {}
        discuss[discussion.topic_url] = action.payload;
        state.list.push(discuss);
      }
      // check if empty response
      if (action.payload.length === 0) {
        state.retrieved.push(action.meta['arg']);
        return;
      }
      state.retrieved.push(action.payload[0].topic_url);
    },
    [retrieveTopicDiscussions.rejected]: (state, action) => {
      console.log(action.payload)
    },
    // create-discussion
    [createTopicDiscussion.fulfilled]: (state, action) => {
      state.list.push(action.payload.discussion);
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
