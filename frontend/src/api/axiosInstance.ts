import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9090/api/v1",
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

// Add an interceptor to add JWT to all requests
axiosInstance.interceptors.request.use(
    (config) => {
      // Retrieve the token from localStorage (or sessionStorage or Redux)
      const authUser = localStorage.getItem('user');  // Adjust this as per your token storage
      const parseAuthUser = authUser ? JSON.parse(authUser) : null; 
      if (parseAuthUser) {
        // config.headers['Authorization'] = `Bearer ${parseAuthUser.authToken}`; // Attach the token
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;