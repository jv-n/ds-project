import axios from 'axios';

const urls = [`http://localhost:${process.env.SERVER_PORT || 3005}`, 'http://67.205.174.99:3005/'];
const api = axios.create({
  baseURL: urls[0]
});

export default api;