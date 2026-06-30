import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://c9t.tanhuynh.me/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const isLoginRequest = originalRequest.url?.includes('/user/login');
        const isRefreshRequest = originalRequest.url?.includes('/user/refresh-token');

        if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest && !isRefreshRequest) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const rToken = localStorage.getItem('refreshToken');
            if (!rToken) {
                isRefreshing = false;
                // No refresh token, logout
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(error);
            }

            try {
                // IMPORTANT: Use original axios here or a separate instance to avoid interceptor loop
                const response = await axios.post(`${api.defaults.baseURL}/user/refresh-token`, {
                    refreshToken: rToken
                });

                const { accessToken, refreshToken } = response.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                api.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;

                processQueue(null, accessToken);
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default api;

