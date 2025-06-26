import { baseURL } from "../../Helper/Helper";

const CATEGORY_ENDPOINTS = {
  CREATE_CATEGORY: `${baseURL}/api/add-category`,
  UPDATE_CATEGORY: `${baseURL}/api/update`,
  GET_DEFAULT_CATEGORY: `${baseURL}/api/get-default-categories`,
  DELETE_CATEGORY: (id)=> `${baseURL}/api/delete-category/${id}`,
  GET_USER_CATEGORY:`${baseURL}/api/get-user-categories`
};

export default CATEGORY_ENDPOINTS;
