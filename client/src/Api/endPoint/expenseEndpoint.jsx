import { baseURL } from "../../Helper/Helper";

const Expense_ENDPOINTS = {
  CREATE_Expense: `${baseURL}/api/add-expense`,
  UPDATE_Expense: (id)=> `${baseURL}/api/update-expense/${id}`,
  GET_Expense: `${baseURL}/api/get-expenses`,
  DELETE_Expense:(id)=> `${baseURL}/api/delete-expense/${id}`,
  RESTORE_Expense:(id)=> `${baseURL}/api/restore-expense/${id}`,
};

export default Expense_ENDPOINTS;
