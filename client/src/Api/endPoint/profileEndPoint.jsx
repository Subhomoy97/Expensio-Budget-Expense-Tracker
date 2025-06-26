import { baseURL } from "../../Helper/Helper";

const PROFILE_ENDPOINTS = {
  CREATE_PROFILE: `${baseURL}/user/profile/create`,
  UPDATE_PROFILE: `${baseURL}/user/profile/update`,
  GET_PROFILE: `${baseURL}/user/profile/`,
};

export default PROFILE_ENDPOINTS;
