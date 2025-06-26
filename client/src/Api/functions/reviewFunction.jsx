import { toast } from "react-toastify";
import axiosInstance from "../../Helper/Helper";
import Review_ENDPOINTS from "../endPoint/reviewEndPoint";

export const createReview = async (data) => {
  try {
    const res = await axiosInstance.post(Review_ENDPOINTS.CREATE_REVIEW, data);
    if (res) {
      toast.success(res?.data?.message);
      console.log("createReview:",res);
      
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const getAllReview = async (setGetSetting) => {
  try {
    const res = await axiosInstance.get(Review_ENDPOINTS.Get_All_REVIEW);
    if (res) {
      //   toast.success(res?.data?.message);
      console.log("getSetting", res);
      setGetSetting(res.data);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const getUserReview = async (setGetUserReview) => {
  try {
    const res = await axiosInstance.get(Review_ENDPOINTS.Get_User_REVIEW);
    if (res) {
      //   toast.success(res?.data?.message);
      console.log("getSetting", res);
      setGetUserReview(res);
    }
  } catch (error) {
    // toast.error(error.response.data.message);
    console.log(error.response.data.message);
    console.log(error);
  }
};
export const updateReview = async (data) => {
  try {
    const res = await axiosInstance.put(Review_ENDPOINTS.Update_REVIEW, data);
    if (res) {
      toast.success(res?.data?.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};
