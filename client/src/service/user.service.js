import http from "./http-common";

class UserDataService {
  login(data) {
    return http.post("/user/login", data);
  }

  register(data) {
    return http.post("/user/register", data);
  }

  logout() {
    return http.get("/user/logout");
  }

  checkUserLoggedStatus() {
    return http.get("/user/status");
  }

  // getUserInfo() {
  //   return http.get("/user/info", config);
  // }
}

export default new UserDataService();
