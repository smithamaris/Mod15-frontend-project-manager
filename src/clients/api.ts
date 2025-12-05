import axios from "axios";



export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzMxZDM4NDU2ZGU4YTMwNmE5ODUyMCIsInVzZXJuYW1lIjoiU2hheSIsImVtYWlsIjoidXNlcjZAdGVzdC5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3NjQ5NTc1MjcsImV4cCI6MTc2NDk2NDcyN30.tsnItzv6c2qjwN1xNIY0d5hPOGtYZkrDWN-LdQuIkQ0'
    }
});