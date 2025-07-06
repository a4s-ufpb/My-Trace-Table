import { apiAxios } from "../axios/axiosConfig";

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

    findAllThemes() {
        return this.handleRequest("get", "/theme")
    }

    findThemesByUser(userId) {
        return this.handleRequest("get", `/theme/user/${userId}`)
    }

    findThemeById(themeId) {
        return this.handleRequest("get", `/theme/${themeId}`)
    }
}