import http from "./http-common";
const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

class DiscussionDataService {
  getTopicDiscussion(topic_url) {
    return http.get(`/topics/${topic_url}/discussions`);
  }

  getDiscussionById(topic_url, discussion_id) {
    return http.get(`/topics/${topic_url}/discussions/${discussion_id}`);
  }

  createTopicDiscussion(data) {
    return http.post("/topics/discussion/create", data, config);
  }

  updateTopicDiscussion(data) {
    return http.put("/topics/discussion/update", data, config);
  }

  deleteTopicDiscussion(discussion_id) {
    config['data'] = discussion_id;
    return http.delete("/topics/discussion/delete", config);
  }

}

export default new DiscussionDataService();
