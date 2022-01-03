import http from "./http-common";

class UserDataService {
  login(data) {
    return http.post("/user/login", data);
  }

  register(data) {
    return http.post("/user/register", data);
  }
}

export default new UserDataService();
