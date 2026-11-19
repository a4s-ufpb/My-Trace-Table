import { apiAxios } from "../axios/axiosConfig";
import { formatFieldErrors } from "../utils/errorUtils";

export class TraceTableService {
    getToken() {
        return localStorage.getItem("token");
    }

    getUserId() {   
        return localStorage.getItem("userId");
    }

    async handleRequest(method, url, data = null, isMultipart = false) {
        const token = this.getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        if (!isMultipart) {
            headers["Content-Type"] = "application/json";
        }

        const response = {
            data: {},
            message: "",
            success: false,
        };

        try {
            const res = await apiAxios({
                method,
                url,
                data,
                headers,
            });

            response.data = res.data;
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

    findAllTraceTablesByThemeName(themeName, page = 0, size = 1000, creatorId) {
        return this.handleRequest("get", `/trace/theme/name/${themeName}?page=${page}&size=${size}&prof=${creatorId}`)
    }

    checkUserAnswer(traceTableId, userAnswer) {
        return this.handleRequest("post", `/trace/check/${traceTableId}`, userAnswer);
    }

    submitAnswer = async (traceId, userTraceTable) => {
        try {
            return this.handleRequest("post", `/trace/submit/${traceId}`, userTraceTable);
        } catch (error) {
            return { success: false, message: "Erro ao salvar resposta no banco." };
        }
    };

    getAnswersByExerciseAndDateAndName(traceId, startDate, endDate, studentName) {
        let url = `/trace/answers/${traceId}`;

        if (startDate && endDate && studentName != "") {
            url += `?startDate=${startDate}T00:00:00&endDate=${endDate}T23:59:59&studentName=${studentName}`;
        } else if (startDate && endDate) {
            url += `?startDate=${startDate}T00:00:00&endDate=${endDate}T23:59:59`;
        } else if (studentName != "") {
            url += `?studentName=${studentName}`;
        }

        return this.handleRequest("get", url);
    }

    getMetrics(traceId, startDate, endDate, studentName) {
        let url = `/trace/metrics/${traceId}`;

        if (startDate && endDate && studentName != "") {
            url += `?startDate=${startDate}T00:00:00&endDate=${endDate}T23:59:59&studentName=${studentName}`;
        } else if (startDate && endDate) {
            url += `?startDate=${startDate}T00:00:00&endDate=${endDate}T23:59:59`;
        } else if (studentName != "") {
            url += `?studentName=${studentName}`;
        }

        return this.handleRequest("get", url);
    }

    async getById(id) {
        return this.handleRequest("get", `/trace/${id}`);
    }

    async addTraceTable(traceTable, imageFile, themesIds = []) {
        const userId = this.getUserId();
        const token = this.getToken();

        const formData = new FormData();
        const blob = new Blob([JSON.stringify(traceTable)], { type: "application/json" });
        formData.append("traceTableRequest", blob);
        formData.append("image", imageFile);

        const queryParams = themesIds.map(id => `themesIds=${id}`).join("&");
        const url = `/trace/${userId}?${queryParams}`;

        const response = {
            data: {},
            message: "",
            success: false,
        };

        try {
            const res = await apiAxios.post(url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            response.data = res.data;
            response.success = true;
        } catch (error) {
            const responseData = error.response?.data;

            response.message = formatFieldErrors(responseData);
        }

        return response;
    }

    async editTraceTable(traceTableId, updatedData, themesIds) {
        const userId = this.getUserId();

        const queryParams = themesIds.map(id => `themesIds=${id}`).join("&");
        const url = `/trace/${traceTableId}/${userId}?${queryParams}`;

        return this.handleRequest("put", url, updatedData);
    }


    async deleteTraceTable(traceTableId) {
        const userId = this.getUserId();
        return this.handleRequest("delete", `/trace/${traceTableId}/${userId}`);
    }
}