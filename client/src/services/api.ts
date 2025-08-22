import axios from "axios";

const urls = [`http://localhost:${process.env.PORT || 3001}`, "http://67.205.174.99:3001/"];

const api = axios.create({
  baseURL: urls[0],
  withCredentials: true, // envio de cookies
});

export default api;