import { apiAxios } from "../axios/AxiosConfig";

export class ThemeService {
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

  insertTheme(themeRequest, userId) {
    return this.handleRequest("post", `/theme/${userId}`, themeRequest)
  }

  updateTheme(themeUpdate, userId, themeId) {
    return this.handleRequest("put", `/theme/${themeId}/${userId}`, themeUpdate)
  }

  removeTheme(themeId, userId) {
    return this.handleRequest("delete", `/theme/${themeId}/${userId}`)
  }

  findAllThemes() {
    return this.handleRequest("get", "/theme")
  }

  findThemesByUser(userId) {
    return this.handleRequest("get", `/theme/user/${userId}`)
  }
}
