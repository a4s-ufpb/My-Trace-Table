import axios from "axios";

export const apiAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://mytracetable.a4s.dev.br/api',
    headers: {
        "Content-Type": "application/json"
    }
})