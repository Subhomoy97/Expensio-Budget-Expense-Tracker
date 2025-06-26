import { toast } from "react-toastify";
import axiosInstance from "../../Helper/Helper";
import PROFILE_ENDPOINTS from "../endPoint/profileEndPoint";

export const getProfile = async (setProfileData, setLoading) => {
  setLoading(true);
  try {
    const res = await axiosInstance.get(PROFILE_ENDPOINTS.GET_PROFILE);
    if (res?.data?.success === true) {
      const profileData = res?.data?.profile;
      setProfileData(profileData);
      toast.error(res?.data?.message);
      console.log("pdata", profileData);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};

export const createProfile = async (
  data,
  navigate,
  setLoading,
  setProfileCreate
) => {
  setLoading(true);
  try {
    const res = await axiosInstance.post(
      PROFILE_ENDPOINTS.CREATE_PROFILE,
      data
    );
    if (res) {
      toast.success(res?.data?.message);
      setProfileCreate(true);
      
      navigate("/dashboard");
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  } finally {
    setLoading(false);
  }
};

export const profileUpdate = async (data, navigate, setLoading) => {
  try {
    setLoading(true);
    const res = await axiosInstance.post(
      PROFILE_ENDPOINTS.UPDATE_PROFILE,
      data
    );
    if (res) {
      toast.success(res.data.message);
      navigate("/profile");
    }
  } catch (error) {
    toast.error(error.message);
    setLoading(false);
  }
};

const getProfileImg = async (mdeia) => {
  return;
};
