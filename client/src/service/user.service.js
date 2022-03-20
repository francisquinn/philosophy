import http from "./http-common";

class UserDataService {
  login(data) {
    return http.post("/user/login", data);
  }

  register(data) {
    return http.post("/user/register", data);
  }

  getUserInfo() {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    };
    return http.get("/user/info", config);
  }
}

export default new UserDataService();
