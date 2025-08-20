import { BASE_URL } from "./apiPaths";
import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      
    }
})

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token")
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => {
        if (error.register) {
            if (error.response.status === 401) {
                window.location.href = '/'
            }
            else if (error.response.status == 500) {
                console.error("request timeout, please try again")
            }
            return Promise.reject(error)
        }
    }
)

export default axiosInstance