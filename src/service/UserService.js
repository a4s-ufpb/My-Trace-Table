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

    findAllUsers() {
        return this.handleRequest("get", `/user/all`);
    }
}