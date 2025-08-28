import axios from 'axios';

const urls = [`http://0.0.0.0:${process.env.SERVER_PORT || 3001}`, 'http://67.205.174.99:3001/'];
const api = axios.create({
  baseURL: urls[0]
});

export default api;