import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005",
});

export default api;
