import { apiAxios } from "../axios/axiosConfig";

export class UserService {
  async handleRequest(method, url, data = null) {
    const response = {
      data: {},
      message: "",
      success: false,
    };

    try {
      const asyncResponse = await apiAxios[method](url, data);
      response.data = asyncResponse.data;
      response.success = true;
    } catch (error) {
      response.message = error.response?.data.message || "Tente novamente mais tarde!";
    }

    return response;
  }

  registerUser(user) {
    return this.handleRequest("post", "/user/register", user);
  }

  loginUser(userLogin) {
    return this.handleRequest("post", "/user/login", userLogin);
  }

  findUser() {
    return this.handleRequest("get", `/user/find`);
  }

  findAllUsers() {
    return this.handleRequest("get", `/user/all`);
  }

  async removeUser(userId, isAdmin = false) {
    if(isAdmin) {
      return this.handleRequest("delete", `/user/${userId}`);
    }

    const response = await this.handleRequest("delete", `/user/${userId}`);
    if (response.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  }

  updateUser(userId, userUpdate) {
    return this.handleRequest("patch", `/user/${userId}`, userUpdate);
  }

  validateIfUserIsAdmin(userId) {
    return this.handleRequest("get", `/user/admin/${userId}`);
  }
}