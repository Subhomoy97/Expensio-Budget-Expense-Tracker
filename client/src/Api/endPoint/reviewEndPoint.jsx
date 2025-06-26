import { baseURL } from "../../Helper/Helper";

const Review_ENDPOINTS = {
  CREATE_REVIEW: `${baseURL}/user/add-review`,
  Update_REVIEW: `${baseURL}/user/update-review`,
  Get_All_REVIEW: `${baseURL}/user/get-reviews`,
  Get_User_REVIEW: `${baseURL}/user/get-user-review`,
};

export default Review_ENDPOINTS;
