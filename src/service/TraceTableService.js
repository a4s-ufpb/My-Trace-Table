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
            if (error.response?.data) {
                response.data = error.response.data;
                response.message = error.response.data.message || "Erro na resposta do servidor";
            } else {
                response.message = "Erro de conexão com o servidor";
            }
        }

        return response;
    }

    findAllTraceTablesByUser(userId, page = 0, size = 1000) {
        return this.handleRequest("get", `/trace/user/${userId}?page=${page}&size=${size}`)
    }

    findAllTraceTablesByTheme(themeId, page = 0, size = 1000) {
        return this.handleRequest("get", `/trace/theme/${themeId}?page=${page}&size=${size}`)
    }

    findAllTraceTablesByThemeName(themeName, page = 0, size = 1000) {
        return this.handleRequest("get", `/trace/theme/name/${themeName}?page=${page}&size=${size}`)
    }

    checkUserAnswer(traceTableId, userAnswer) {
        return this.handleRequest("post", `/trace/check/${traceTableId}`, userAnswer);
    }
}