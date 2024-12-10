// src/api.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.8:8000/api', // Your Laravel API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
