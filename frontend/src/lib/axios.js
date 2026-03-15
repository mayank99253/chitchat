import axios from "axios";

const axiosInstance = axios.create({
    baseURL : import.meta.env.MODE === "development"?"https://chitchat-tnaj.onrender.com/api":"/api",
    withCredentials:true,
})

export default axiosInstance
