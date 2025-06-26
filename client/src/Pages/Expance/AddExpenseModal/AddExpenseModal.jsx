import React, { useState, useEffect } from "react";
import {
  getDefaultCategory,
  getUserCategory,
} from "../../../Api/functions/categoryfunctions";
import {
  createExpense,
  getAllExpense,
} from "../../../Api/functions/expencseFunctions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getAllSetting } from "../../../Api/functions/settingFunctions";

const AddExpenseModal = ({ show, onClose, setExpenses }) => {
  const [categories, setCategories] = useState([]);
  const [budgetLimit, setBudgetLimit] = useState({});
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [exceededLimitType, setExceededLimitType] = useState("");
  const [pendingExpense, setPendingExpense] = useState(null);

  useEffect(() => {
    getUserCategory((userCats) => {
      getDefaultCategory((defaultCats) => {
        const combined = [
          ...userCats,
          ...defaultCats.filter(
            (defCat) =>
              !userCats.some((userCat) => userCat.name === defCat.name)
          ),
        ];
        setCategories(combined);
      });
    });
    getAllSetting((settings) => {
      setBudgetLimit(settings?.data || {});
    });
  }, []);

  const getCurrentLimitType = (selectedDate) => {
    const today = new Date().toISOString().split("T")[0];
    const selected = new Date(selectedDate);
    const now = new Date();

    const isSameDay = today === selectedDate;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(now.getDate() - 7);

    const isSameWeek = selected >= oneWeekAgo;

    const isSameMonth =
      selected.getFullYear() === now.getFullYear() &&
      selected.getMonth() === now.getMonth();

    if (isSameDay && budgetLimit.dailyLimit) return "daily";
    if (isSameWeek && budgetLimit.weeklyLimit) return "weekly";
    if (isSameMonth && budgetLimit.monthlyLimit) return "monthly";

    return null;
  };

  const getLimitValue = (type) => {
    switch (type) {
      case "daily":
        return budgetLimit.dailyLimit;
      case "weekly":
        return budgetLimit.weeklyLimit;
      case "monthly":
        return budgetLimit.monthlyLimit;
      default:
        return null;
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    const newExpense = {
      note: expenseName,
      amount: Number(amount),
      categoryId: category,
      date,
    };

    const limitType = getCurrentLimitType(date);
    const limitValue = getLimitValue(limitType);

    if (limitValue && Number(amount) > limitValue) {
      setExceededLimitType(limitType);
      setPendingExpense(newExpense);
      setShowConfirm(true);
      return;
    }

    await createExpense(newExpense);
    const fetchExpenses = async () => {
          await getAllExpense((data) => {
            setExpenses(data);
          });
        };
        fetchExpenses();
    resetForm();
    onClose(); // Close the AddExpenseModal
  };

  const confirmExceededExpense = async () => {
    if (pendingExpense) {
      await createExpense(pendingExpense);
      const fetchExpenses = async () => {
          await getAllExpense((data) => {
            setExpenses(data);
          });
        };
        fetchExpenses();
    }
    resetForm();
    setShowConfirm(false); // Close confirmation modal
    onClose(); // Close AddExpenseModal too
  };

  const resetForm = () => {
    setExpenseName("");
    setAmount("");
    setCategory("");
    setDate("");
    setPendingExpense(null);
    setExceededLimitType("");
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3" onSubmit={handleAddExpense}>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Expense Note"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="col-12 d-flex justify-content-end">
              <Button type="submit" className="main-btn">
                Add Expense
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Exceeded Budget Limit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to exceed your{" "}
            <strong>{exceededLimitType}</strong> limit?
          </p>
          <p>
            Your set {exceededLimitType} limit is:{" "}
            <strong>
              {getLimitValue(exceededLimitType)} {budgetLimit?.currency || ""}
            </strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmExceededExpense}>
            Yes, Add Anyway
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddExpenseModal;
