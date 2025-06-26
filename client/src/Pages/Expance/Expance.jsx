import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import Layout from "../../Layout/Layout";
import { FaEdit, FaTrash, FaUndo } from "react-icons/fa";
import ProfileAvtar from "../../Components/ProfileAvtar";
import AddExpenseModal from "../Expance/AddExpenseModal/AddExpenseModal";
import EditExpenseModal from "../Expance/EditExpenseModal/EditExpenseModal";
import ConfirmDeleteModal from "../../Components/ConfirmDeleteModal";
import {
  deleteExpense,
  getAllExpense,
  restoreExpense,
} from "../../Api/functions/expencseFunctions";
import Loader from "../../Components/Loader";
import { getAllSetting } from "../../Api/functions/settingFunctions";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend);

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [editData, setEditData] = useState(null);
  const [selectID, setSelectID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [getSetting, setGetSetting] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5;

  const handleEditClick = (expense, id) => {
    setSelectID(id);
    setEditData(expense);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    setExpenseToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await deleteExpense(expenseToDelete);
    const fetchExpenses = async () => {
      setLoading(true);
      await getAllExpense((data) => {
        setExpenses(data);
        setLoading(false);
      });
    };
    fetchExpenses();
    setShowDeleteModal(false);
    setExpenseToDelete(null);
  };

  const handleRestoreClick = async (id) => {
    await restoreExpense(id);
    const fetchExpenses = async () => {
      setLoading(true);
      await getAllExpense((data) => {
        setExpenses(data);
        setLoading(false);
      });
    };
    fetchExpenses();
  };

    useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      await getAllExpense((data) => {
        setExpenses(data);
        setLoading(false);
      });
    };
    fetchExpenses();
    getAllSetting(setGetSetting);
  }, []);
  
  const filteredExpenses = expenses.filter((expense) =>
    expense.note.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, expenses]);

  const categoryMap = {};
  expenses.forEach((exp) => {
    if (!exp.isDeleted) {
      const categoryName = exp.categoryId?.name || "Unknown";
      const amount = parseFloat(exp.amount);
      categoryMap[categoryName] = (categoryMap[categoryName] || 0) + amount;
    }
  });

  const categories = Object.keys(categoryMap);
  const amounts = Object.values(categoryMap);

  const data = {
    labels: categories,
    datasets: [
      {
        data: amounts,
        backgroundColor: ["#d63384", "#dc3545", "#20c997", "#0d6efd"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "black",
          padding: 15,
          font: { size: 14, weight: "500" },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <section className="expance-section py-4">
          <div className="container-fluid">
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-2 mb-md-0">Expense</h2>
              <ProfileAvtar />
            </div>

            <div className="mb-4 d-flex justify-content-end">
              <button
                className="btn fw-semibold main-btn shadow-custom"
                style={{ backgroundColor: "#0164ab", color: "#fff" }}
                onClick={() => setShowAddModal(true)}
              >
                + Add Expense
              </button>
            </div>

            <div className="row g-4">
              <div className="col-12 col-lg-7">
                <div
                  className="card h-100 border-0 shadow-custom"
                  style={{ backgroundColor: "#F4F1F6", borderRadius: "12px" }}
                >
                  <div className="card-body expance-area">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title fw-semibold mb-3">
                        Recent Expenses
                      </h5>
                      <div
                        className="position-relative expance-input"
                        style={{ width: "30%" }}
                      >
                        <input
                          type="text"
                          placeholder="Search"
                          className="form-control pe-5"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <i
                          className="fas fa-search position-absolute"
                          style={{
                            right: "15px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            color: "black",
                            pointerEvents: "none",
                          }}
                        ></i>
                      </div>
                    </div>

                    <div className="expance-table table-responsive">
                      <table className="table table-hover align-middle mb-0">
                        <thead style={{ backgroundColor: "#CFDBE9" }}>
                          <tr>
                            <th>Expense Note</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentExpenses.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="text-center py-3">
                                No expenses found
                              </td>
                            </tr>
                          ) : (
                            currentExpenses.map((expense) => (
                              <tr
                                key={expense._id}
                                className={
                                  expense.isDeleted ? "text-muted" : ""
                                }
                                style={
                                  expense.isDeleted ? { opacity: 0.5 } : {}
                                }
                              >
                                <td>{expense.note}</td>
                                <td>
                                  {formatCurrency(
                                    expense.amount,
                                    getSetting.data?.currency
                                  )}
                                </td>
                                <td>
                                  {
                                    new Date(expense.date)
                                      .toISOString()
                                      .split("T")[0]
                                  }
                                </td>
                                <td>
                                  {expense.categoryId == null
                                    ? "Category Deleted"
                                    : expense.categoryId?.name}
                                </td>
                                <td className="text-center">
                                  {expense.isDeleted ? (
                                    <button
                                      className="btn btn-outline-success btn-sm"
                                      onClick={() =>
                                        handleRestoreClick(expense._id)
                                      }
                                    >
                                      <FaUndo /> Restore
                                    </button>
                                  ) : (
                                    <div className="d-flex justify-content-center gap-2">
                                      <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() =>
                                          handleEditClick(expense, expense._id)
                                        }
                                      >
                                        <FaEdit />
                                      </button>
                                      <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() =>
                                          handleDeleteClick(expense._id)
                                        }
                                      >
                                        <FaTrash />
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    {filteredExpenses.length > expensesPerPage && (
                      <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                        <span>
                          Page {currentPage} of {totalPages}
                        </span>
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div
                  className="card h-100 shadow-custom border-0"
                  style={{ backgroundColor: "#f7f6fb" }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-center fw-semibold mb-4">
                      Expenses by Category
                    </h5>
                    <div style={{ height: "300px", width: "100%" }}>
                      <Pie data={data} options={options} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <AddExpenseModal
              show={showAddModal}
              onClose={() => setShowAddModal(false)}
              setExpenses={setExpenses}
            />
            <EditExpenseModal
              show={showEditModal}
              onClose={() => setShowEditModal(false)}
              expense={editData}
              selectID={selectID}
              setExpenses={setExpenses}
            />
            <ConfirmDeleteModal
              show={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={confirmDelete}
            />
          </div>
        </section>
      )}
      <footer id="expensio-footer" className="bg-dark text-white pt-3">
        <div className="container text-center">
          <hr style={{ borderTop: "2px solid white" }} />
          <p>
            Use of this website constitutes acceptance of the site{" "}
            <Link
              to="/terms-conditions"
              className="text-primary text-decoration-underline fw-semibold"
            >
              Terms of Service
            </Link>
          </p>
          <p className="mb-0">&#169; 2025 Expensio – All rights reserved</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Expense;
