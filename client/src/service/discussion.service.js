import http from "./http-common";

class DiscussionDataService {
  getTopicDiscussions(topic_url, signal) {
    return http.get(`/topics/${topic_url}/discussions`, { signal: signal });
  }

  getDiscussionByUrl(topic_url, discussion_url, signal) {
    return http.get(`/topics/${topic_url}/discussions/${discussion_url}`, { signal: signal });
  }

  createTopicDiscussion(data) {
    return http.post("/topics/discussion/create", data);
  }

  updateTopicDiscussion(data) {
    return http.put("/topics/discussion/update", data);
  }

  deleteTopicDiscussion(data) {
    return http.delete("/topics/discussion/delete", { data: data });
  }

}

export default new DiscussionDataService();
