import { toast } from "react-toastify";
import axiosInstance, { baseURL } from "../../Helper/Helper";
import CATEGORY_ENDPOINTS from "../endPoint/categoryEndPoint";

export const getDefaultCategory = async (setDefaultCategories,) => {
  try {
    const res = await axiosInstance.get(
      CATEGORY_ENDPOINTS.GET_DEFAULT_CATEGORY
    );
    if (res) {
      setDefaultCategories(res?.data?.category);
    }
  } catch (error) {
    console.log("getDefaultCategoryError", error);
  }
};

export const getUserCategory = async (setUserCategories) => {
  try {
    const res = await axiosInstance.get(CATEGORY_ENDPOINTS.GET_USER_CATEGORY);
    if (res) {
      setUserCategories(res?.data?.categories);
    }
  } catch (error) {
    console.log("getUserCategoryError", error);
  }
};

export const getDefaultCategoryImg = (media) => {
  return `${baseURL}/${media}`;
};

export const createCategory = async (data) => {
  try {
    const res = await axiosInstance.post(
      CATEGORY_ENDPOINTS.CREATE_CATEGORY,
      data
    );
    if (res) {
      console.log("createCategory", res);
      toast.success(res?.data?.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.log("createCategoryError", error);
  }
};

export const updateCategory = async (data) => {
  try {
    const res = await axiosInstance.post(
      CATEGORY_ENDPOINTS.UPDATE_CATEGORY,
      data
    );
    if (res) {
      console.log("updateCategory", res);
    }
  } catch (error) {
    console.log("updateCategoryError", error);
  }
};

export const deleteCategory = async (id) => {
  try {
    const res = await axiosInstance.delete(
      CATEGORY_ENDPOINTS.DELETE_CATEGORY(id)
    );
    if (res) {
      toast.success(res?.data?.message);
    }
  } catch (error) {
    console.log("deleteCategoryError", error);
  }
};
