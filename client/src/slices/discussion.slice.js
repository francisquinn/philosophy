import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DiscussionDataService from "../service/discussion.service";

const initialState = {
  list: [],
  current: {},
  topic: null,
  isLoading: true
};

export const retrieveTopicDiscussions = createAsyncThunk(
  "discussions/retieveTopicDiscussions",
  async (topic_url) => {
    const res = await DiscussionDataService.getTopicDiscussion(topic_url)
    .catch((err) => {
      return err.response;
    });
    return res.data;
  }
);

export const retrieveDiscussionByUrl = createAsyncThunk(
  "discussions/retieveByUrl",
  async ({ topic_url, discussion_url }) => {
    const res = await DiscussionDataService.getDiscussionByUrl(
      topic_url,
      discussion_url
    )
    .catch((err) => {
      return err.response;
    });
    return res.data;
  }
);

export const createTopicDiscussion = createAsyncThunk(
  "discussions/create",
  async ({ title, description, topic_url }) => {
    const res = await DiscussionDataService.createTopicDiscussion({
      title: title,
      description: description,
      topic_url: topic_url
    })
    .catch((err) => {
      return err.response;
    });

    return res.data;
  }
);

export const updateTopicDiscussion = createAsyncThunk(
  "discussions/update",
  async ({ discussion_id, title, description, topic_id }) => {
    const res = await DiscussionDataService.updateTopicDiscussion({
      discussion_id: discussion_id,
      title: title,
      description: description,
      topic_id: topic_id
    })
    .catch((err) => {
      return err.response;
    });;
    return res.data;
  }
);

export const deleteTopicDiscussion = createAsyncThunk(
  "discussions/delete",
  async ({ discussion_id }) => {
    const res = await DiscussionDataService.deleteTopicDiscussion({
      discussion_id: discussion_id
    })
    .catch((err) => {
      return err.response;
    });;
    return res.data;
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
    [retrieveTopicDiscussions.pending]: (state) => {
      state.isLoading = true;
      state.list = [];
    },
    [retrieveTopicDiscussions.fulfilled]: (state, action) => {
      state.isLoading = false;
      for (const discussion of action.payload) {
        state.list.push(discussion);
      }
    },
    [createTopicDiscussion.fulfilled]: (state, action) => {
      state.list.push(action.payload.discussion);
    },
    [retrieveDiscussionByUrl.pending]: (state) => {
      state.isLoading = true;
    },
    [retrieveDiscussionByUrl.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
    },
    [deleteTopicDiscussion.fulfilled]: (state) => {
      state.isLoading = false;
      if (state.list.length !== 0) {
        state.list = state.list.filter(discussion => discussion._id !== state.current._id);
      } 
      state.current = {};
    },
    [updateTopicDiscussion.fulfilled]: (state, action) => {
      state.isLoading = false;
      if (state.list.length !== 0) {
        const index = state.list.findIndex(discussion => discussion._id === state.current._id);
        state.list[index] = action.payload.discussion;
      }
      state.current = action.payload.discussion;
    },
  },
});

// export reducers
export const { setCurrentDiscussion, setCurrentTopic } = discussionSlice.actions;

const { reducer } = discussionSlice;
export default reducer;
