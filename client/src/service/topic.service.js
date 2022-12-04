import http from "./http-common";

class TopicDataService {
  getAllTopics(signal) {
    return http.get("/topics", { signal: signal });
  }

  getTopicByUrl(url) {
    return http.get(`/topics/${url}`);
  }

  create(data) {
    return http.post("/topics", data);
  }
}

export default new TopicDataService();
