import { apiAxios } from "../axios/axiosConfig";
import { formatFieldErrors } from "../utils/errorUtils";

export class AuthService {
    async login(email, password) {
        try {
            const response = await apiAxios.post("/user/login", {
                email,
                password,
            });
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            const status = error.response?.status;
            let message = "Erro ao autenticar. Tente novamente.";

            if (status === 400 || status === 403) {
                message = "Email ou senha inválidos";
            }

            return {
                success: false,
                message,
            };
        }
    }

    async register(name, email, password, role) {
        try {
            const response = await apiAxios.post("/user/regAlun", {
                name,
                email,
                password,
                role
            });
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erro ao cadastrar usuário",
            };
        }
    }

    async getUserData(token) {
        try {
            const response = await apiAxios.get("/user/find", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return {
                success: true,
                data: response.data,
            };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || "Erro ao buscar usuário",
            };
        }
    }

}
