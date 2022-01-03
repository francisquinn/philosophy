import http from "./http-common";

class DiscussionDataService {
  getTopicDiscussion(url) {
    return http.get(`/topics/${url}/discussions`);
  }

  getDiscussionById(topic_url, discussion_id) {
    return http.get(`/topics/${topic_url}/discussions/${discussion_id}`);
  }

}

export default new DiscussionDataService();
