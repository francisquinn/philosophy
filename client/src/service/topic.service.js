import http from "./http-common";

class TopicDataService {
    getALLTopics() {
        return http.get("/topics");
    }

    create(data) {
        return http.post("/topics", data);
    }
}

export default new TopicDataService();
