import axios from "axios";
import Cookies from "js-cookie";

let adminUrl = "https://expensio-nkvc.onrender.com";
// let adminUrl="http://localhost:3010";

export const baseURL = adminUrl;

let axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const authCookie = Cookies.get("auth");
    if (authCookie) {
      try {
        const parsed = JSON.parse(authCookie);
        if (parsed?.token) {
          config.headers["x-access-token"] = parsed.token;
        }
      } catch (err) {
        console.error("Error parsing auth cookie", err);
      }
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
