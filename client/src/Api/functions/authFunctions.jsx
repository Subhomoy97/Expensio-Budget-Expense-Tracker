import { toast } from "react-toastify";
import axiosInstance from "../../Helper/Helper";
import AUTH_ENDPOINTS from "../endPoint/authEndPoint";
import Cookies from "js-cookie";

export const login = async (
  data,
  navigate,
  setLoading,
  auth,
  setAuth,
) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, data);
    if (response?.data?.success == true) {
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      // Store in cookies instead of localStorage
      Cookies.set("auth", JSON.stringify(response.data), { expires: 1 });
      Cookies.set("token", response.data.token, { expires: 1 });
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
    if(response.data.user.isProfileCreated==false){
      navigate("/create-profile")
    }
    else{
       navigate("/dashboard")
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Login failed. Please check your credentials."
    );
  } finally {
    setLoading(false);
  }
};

export const registerUser = async (newData, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, newData);
    if (response.data.success == true) {
      // console.log(response.data.message);
      toast.success(response.data.message);
      navigate("/verify-otp");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

export const forgotPassword = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.FORGOT_PASSWORD,
      data
    );
    if (response) {
      console.log(response);

      toast.success(response.data.message);
      navigate("/login");
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const updatePassword = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.UPDATE_PASSWORD,
      data
    );
    if (response) {
      console.log(response);

      toast.success(response?.data?.message);
      navigate("/dashboard");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const verifyOtp = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.VERIFY_OTP, data);
    if (response) {
      toast.success(response.data.message);
      navigate("/login");
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Verification failed. Try again."
    );
  } finally {
    setLoading(false);
  }
};

export const resetPassword = async (data, navigate, setLoading, token) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(
      AUTH_ENDPOINTS.RESET_PASSWORD(token),
      data
    );
    toast.success(response.data.message);
    setTimeout(() => {
      window.close();
    },3000);
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

export const resetOTP = async (data,setLoading) => {
  setLoading(true);
  try {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.RESENT_OTP, data);
    if (response) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
