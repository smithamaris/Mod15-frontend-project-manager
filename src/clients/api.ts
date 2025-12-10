import axios from "axios";



export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjY5MzcyMDhkNWJjZGY0MjE2YzVkMGViMCIsInVzZXJuYW1lIjoiTW9hbmEiLCJlbWFpbCI6InRlc3QxMUB0ZXN0LmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTc2NTI1OTE4NCwiZXhwIjoxNzY1MzQ1NTg0fQ.oX22Gcv2lS1KmDbAx07Mp3xvzgmOpVanNZf0OwhMUqY'
    }
});