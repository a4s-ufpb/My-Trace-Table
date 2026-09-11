import { apiAxios } from "../axios/axiosConfig";

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

    async sendRegistrationCode(email) {
        try {
            await apiAxios.post("/verification/registration/send", { email });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Erro ao enviar o código de verificação.",
            };
        }
    }

    async register(name, email, password, role, code) {
        try {
            const response = await apiAxios.post(
                "/user/regAlun",
                { name, email, password, role },
                { params: { code } }
            );
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

    async sendPasswordResetCode(email) {
        try {
            await apiAxios.post("/verification/password-reset/send", { email });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Erro ao enviar o código de verificação.",
            };
        }
    }

    async confirmPasswordReset(email, code, newPassword) {
        try {
            await apiAxios.post("/verification/password-reset/confirm", {
                email,
                code,
                newPassword,
            });
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    "Erro ao redefinir a senha. Verifique o código e tente novamente.",
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
