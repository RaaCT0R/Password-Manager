import axios from 'axios';

export const BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export default apiClient;
