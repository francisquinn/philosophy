import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DiscussionDataService from "../service/discussion.service";

const initialState = {
  discussions: [],
  discussion: {},
  topic: null,
  isLoading: true
};

export const retrieveTopicDiscussions = createAsyncThunk(
  "discussions/retieveTopicDiscussions",
  async (url) => {
    const res = await DiscussionDataService.getTopicDiscussion(url);
    return res.data;
  }
);

export const retrieveDiscussionById = createAsyncThunk(
  "discussions/retieveById",
  async ({ topic_url, discussion_id }) => {
    const res = await DiscussionDataService.getDiscussionById(
      topic_url,
      discussion_id
    );
    return res.data;
  }
);

const discussionSlice = createSlice({
  name: "discussion",
  initialState,
  reducers : {
    setCurrentDiscussion: (state, action) => {
      state.discussion = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.topic = action.payload;
    }
  },
  extraReducers: {
    [retrieveTopicDiscussions.pending]: (state, action) => {
      state.isLoading = true;
      state.discussions = [];
    },
    [retrieveTopicDiscussions.fulfilled]: (state, action) => {
      state.isLoading = false;
      for (const discussion of action.payload) {
        state.discussions.push(discussion);
      }
    },
    [retrieveDiscussionById.pending]: (state, action) => {
      state.isLoading = true;
    },
    [retrieveDiscussionById.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.discussion = action.payload;
    },
  },
});

// export reducers
export const { setCurrentDiscussion, setCurrentTopic } = discussionSlice.actions;

const { reducer } = discussionSlice;
export default reducer;
