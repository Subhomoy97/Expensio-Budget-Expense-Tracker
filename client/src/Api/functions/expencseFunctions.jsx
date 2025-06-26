import { toast } from "react-toastify";
import axiosInstance from "../../Helper/Helper";
import Expense_ENDPOINTS from "../endPoint/expenseEndpoint";

export const getAllExpense = async (setExpenses, setTotalExpense) => {
  try {
    const res = await axiosInstance.get(Expense_ENDPOINTS.GET_Expense);
    if (res) {
      console.log("getExpense", res);
      setExpenses(res?.data?.expenses);
      setTotalExpense(res?.data?.totalExpense);
    }
  } catch (error) {
    console.log("getExpenseError", error);
    toast.error(error.data.message);
  }
};

export const createExpense = async (data) => {
  try {
    const res = await axiosInstance.post(
      Expense_ENDPOINTS.CREATE_Expense,
      data
    );
    if (res) {
      console.log("createExpense", res);
      toast.success("Expense added successfully");
    }
  } catch (error) {
    toast.error(error.message);
    toast.error(error.response.data.message[0]);
    console.log("createExpenseError", error);
  }
};

export const updateExpense = async (id, data) => {
  try {
    const res = await axiosInstance.put(
      Expense_ENDPOINTS.UPDATE_Expense(id),
      data
    );
    if (res) {
      console.log("updateExpense", res);
      toast.success("Expense updated successfully");
    }
  } catch (error) {
    toast.error(error.message);
    console.log("updateExpenseError", error);
  }
};

export const deleteExpense = async (id) => {
  try {
    const res = await axiosInstance.delete(
      Expense_ENDPOINTS.DELETE_Expense(id)
    );
    if (res) {
      console.log("deleteExpense", res);
      toast.success(res?.data?.message);
    }
  } catch (error) {
    console.log("deleteExpenseError", error);
    toast.error(error.message);
  }
};

export const restoreExpense = async (id) => {
  try {
    const res = await axiosInstance.put(Expense_ENDPOINTS.RESTORE_Expense(id));
    if (res) {
      console.log("restoreExpense", res);
      toast.success(res?.data?.message);
    }
  } catch (error) {
    console.log("restoreExpenseError", error);
    toast.error(error.message);
  }
};
