import http from "./http-common";
const config = {
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  }
};

class DiscussionDataService {
  getTopicDiscussions(topic_url) {
    return http.get(`/topics/${topic_url}/discussions`);
  }

  getDiscussionByUrl(topic_url, discussion_url) {
    return http.get(`/topics/${topic_url}/discussions/${discussion_url}`);
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
