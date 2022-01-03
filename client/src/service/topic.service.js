import http from "./http-common";

class TopicDataService {
  getALLTopics() {
    return http.get("/topics");
  }

  getTopicByUrl(url) {
    return http.get(`/topics/${url}`);
  }

  create(data) {
    return http.post("/topics", data);
  }
}

export default new TopicDataService();
