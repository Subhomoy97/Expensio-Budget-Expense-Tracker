import { toast } from "react-toastify";
import axiosInstance from "../../Helper/Helper";
import Contact_ENDPOINTS from "../endPoint/contactEndPoint";

export const submitContact = async (data) => {
  try {
    const res = await axiosInstance.post(
      Contact_ENDPOINTS.CREATE_Contact,
      data
    );
    if (res) {
      toast.success(res?.data?.message);
      console.log("dsfdsf", res);
    }
  } catch (error) {
    console.log("submitContactError", error);
    toast.error(error.message);
    toast.error(error.response.data.message);
  }
};
