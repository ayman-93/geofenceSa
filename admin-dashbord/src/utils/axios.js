import axios from "axios";
 
 
const instance = axios.create({
    baseURL: "http://localhost:3001/",
    responseType: "json"
});
 
// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response.status === 500) {
            console.log(error);
        }
        return Promise.reject(error);
    }
);
 
export default instance;