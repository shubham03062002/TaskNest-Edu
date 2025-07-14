// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://task-nest-edu.vercel.app/api",
  withCredentials: true, // 👈 sends cookies
});

export default api;
