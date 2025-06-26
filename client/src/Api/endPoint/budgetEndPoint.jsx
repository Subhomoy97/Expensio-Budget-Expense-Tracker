import { baseURL } from "../../Helper/Helper";

const BUDGET_ENDPOINTS = {
  CREATE_BUDGET: `${baseURL}/api/set-budget`,
  UPDATE_BUDGET:  (id)=> `${baseURL}/api/update-budget/${id}`,
  GET_BUDGET: `${baseURL}/api/get-budgets`,
  DELETE_BUDGET: (id)=> `${baseURL}/api/delete-budget/${id}`,
  GET_BUDGET_DETAILS:`${baseURL}/api/get-budget-details`
};

export default BUDGET_ENDPOINTS;
