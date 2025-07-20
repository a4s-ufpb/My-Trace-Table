import axios from "axios";

export const apiAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/v1',
    headers: {
        "Content-Type": "application/json"
    }
})