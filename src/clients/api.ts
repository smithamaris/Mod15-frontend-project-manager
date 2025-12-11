import axios from "axios";

// export const apiClient = axios.create({
//     baseURL: import.meta.env.VITE_BACKEND_URL,
//     headers: {
//         Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzcyMDhkNWJjZGY0MjE2YzVkMGViMCIsInVzZXJuYW1lIjoiTW9hbmEiLCJlbWFpbCI6InRlc3QxMUB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTc2NTQxNTg3MSwiZXhwIjoxNzY1NTAyMjcxfQ.JtYqxlRt7VuCW80VzX9f8Aowyj2FBuimyC8QjNHig74"
//     }
// });



export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

