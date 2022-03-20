import http from "./http-common";

class DiscussionDataService {
  getTopicDiscussion(topic_url) {
    return http.get(`/topics/${topic_url}/discussions`);
  }

  getDiscussionById(topic_url, discussion_id) {
    return http.get(`/topics/${topic_url}/discussions/${discussion_id}`);
  }

  createTopicDiscussion(data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    return http.post("/topics/discussion/create", data, config);
  }

  updateTopicDiscussion(data) {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    return http.put("/topics/discussion/update", data, config);
  }

}

export default new DiscussionDataService();
