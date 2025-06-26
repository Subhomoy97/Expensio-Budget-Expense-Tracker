import { toast } from "react-toastify";
import axiosInstance from "../../Helper/Helper";
import SETTING_ENDPOINTS from "../endPoint/settingEndPoint";

export const createSetting = async (data) => {
  try {
    const res = await axiosInstance.post(
      SETTING_ENDPOINTS.CREATE_SETTING,
      data
    );
    if (res) {
      toast.success(res?.data?.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};

export const getAllSetting = async (setGetSetting) => {
  try {
    const res = await axiosInstance.get(SETTING_ENDPOINTS.Get_SETTING);
    if (res) {
      //   toast.success(res?.data?.message);
      console.log("getSetting", res);
      setGetSetting(res)
    }
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error);
  }
};
