import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const API_TIMEOUT = 30000; // 30 seconds

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          localStorage.removeItem("authToken");
          window.location.href = "/login";
          break;
        case 403:
          console.error("Access forbidden");
          break;
        case 404:
          console.error("Resource not found");
          break;
        case 500:
          console.error("Internal server error");
          break;
        default:
          console.error("An error occurred:", error.response.data);
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return Promise.reject(error);
  }
);

// Generic API request function
interface ApiRequestOptions<T = any> extends AxiosRequestConfig {
  data?: T;
  params?: any;
}

export const apiRequest = async <TResponse = any, TData = any>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: ApiRequestOptions<TData>
): Promise<TResponse> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      ...options,
    };

    const response: AxiosResponse<TResponse> = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Convenience methods
export const api = {
  get: <TResponse = any>(url: string, options?: ApiRequestOptions) =>
    apiRequest<TResponse>("GET", url, options),

  post: <TResponse = any, TData = any>(
    url: string,
    data?: TData,
    options?: ApiRequestOptions<TData>
  ) => apiRequest<TResponse, TData>("POST", url, { ...options, data }),

  put: <TResponse = any, TData = any>(
    url: string,
    data?: TData,
    options?: ApiRequestOptions<TData>
  ) => apiRequest<TResponse, TData>("PUT", url, { ...options, data }),

  patch: <TResponse = any, TData = any>(
    url: string,
    data?: TData,
    options?: ApiRequestOptions<TData>
  ) => apiRequest<TResponse, TData>("PATCH", url, { ...options, data }),

  delete: <TResponse = any>(url: string, options?: ApiRequestOptions) =>
    apiRequest<TResponse>("DELETE", url, options),
};

// Export axios instance for advanced usage
export { axiosInstance };

// Default export
export default api;
