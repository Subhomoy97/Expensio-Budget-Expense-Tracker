import { baseURL } from "../../Helper/Helper";

const AUTH_ENDPOINTS = {
  LOGIN: `${baseURL}/auth/login`,
  REGISTER: `${baseURL}/auth/register`,
  FORGOT_PASSWORD: `${baseURL}/auth/forget-password`,
  RESET_PASSWORD: (token) => `${baseURL}/auth/reset-password/${token}`,
  UPDATE_PASSWORD: `${baseURL}/auth/update-password`,
  VERIFY_OTP: `${baseURL}/auth/verify-otp`,
  RESENT_OTP: `${baseURL}/auth/resend-otp`,
};

export default AUTH_ENDPOINTS;
