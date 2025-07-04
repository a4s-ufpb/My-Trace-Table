import axios from "axios";
import { API_URL } from "../vite-env.js";

export const apiAxios = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})