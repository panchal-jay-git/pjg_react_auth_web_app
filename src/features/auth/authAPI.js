import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust to your server's URL

const authAPI = {
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  register: (data) => axios.post(`${API_URL}/register`, data),
  forgotPassword: (email) => axios.post(`${API_URL}/forgot-password`, { email }),
  resetPassword: (data) => axios.post(`${API_URL}/reset-password`, data),
};

export default authAPI;
