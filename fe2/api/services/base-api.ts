/* eslint-disable prettier/prettier */
// api/services/base-api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { API_CONFIG } from '../config/config';

export class BaseApiService {
  protected readonly api: AxiosInstance;
  
  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS
    });

    // Add request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // You can modify requests here (add auth tokens etc.)
        const token = localStorage.getItem('token');

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle common errors (401, 403, etc.)
        if (error.response?.status === 401) {
          // Handle unauthorized access
          window.location.href = '/login';
        }

        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);

    return response.data;
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);

    return response.data;
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);

    return response.data;
  }

  protected async delete<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);

    return response.data;
  }
}