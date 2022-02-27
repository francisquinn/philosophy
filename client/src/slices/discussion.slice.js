import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DiscussionDataService from "../service/discussion.service";

const initialState = {
  discussions: [],
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
  extraReducers: {
    [retrieveTopicDiscussions.fulfilled]: (state, action) => {
      state.isLoading = false;
      for (const discussion of action.payload) {
        state.discussions.push(discussion);
      }
    },
  },
});

const { reducer } = discussionSlice;
export default reducer;
