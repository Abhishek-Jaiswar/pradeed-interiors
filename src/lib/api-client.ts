import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Extract meaningful error message
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    
    // You could also handle global errors like 401 Unauthorized here
    if (error.response?.status === 401) {
      // Redirect to login or clear auth state
    }

    return Promise.reject(new Error(message));
  }
);

export default apiClient;
