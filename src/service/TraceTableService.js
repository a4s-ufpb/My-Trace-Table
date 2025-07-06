import { apiAxios } from "../axios/axiosConfig";

export class TraceTableService {
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

    findAllTraceTablesByUser(userId) {
        return this.handleRequest("get", `/trace/user/${userId}`)
    }

    findAllTraceTablesByTheme(themeId) {
        return this.handleRequest("get", `/trace/theme/${themeId}`)
    }
}