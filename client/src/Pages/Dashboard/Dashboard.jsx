// Import dependencies
import React, { useEffect, useState } from "react";
import { Card, Table, ProgressBar, Pagination } from "react-bootstrap";
import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";

import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import { getAllExpense } from "../../Api/functions/expencseFunctions";
import {
  getAllBudget,
  getBudgetDetails,
} from "../../Api/functions/budgetFunctions";
import Loader from "../../Components/Loader";
import { getAllSetting } from "../../Api/functions/settingFunctions";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [totalBudget, setTotalBudget] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [getSetting, setGetSetting] = useState([]);
  const [budgetPage, setBudgetPage] = useState(1);
  const [expensePage, setExpensePage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getAllExpense(setExpensesData, setTotalExpense),
        getBudgetDetails(setBudgetDetails),
        getAllBudget(setTotalBudget),
      ]);
      setLoading(false);
    };
    fetchData();
    getAllSetting(setGetSetting);
  }, []);

  const getFilteredExpenses = () => {
    const now = new Date();
    if (filterType === "Weekly") {
      const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
      return expensesData.filter(
        (expense) => new Date(expense.date) >= weekStart
      );
    }
    if (filterType === "Monthly") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      return expensesData.filter(
        (expense) => new Date(expense.date) >= monthStart
      );
    }
    return expensesData;
  };

  const filteredExpenses = getFilteredExpenses();

  const paginatedBudgets = budgetDetails.slice(
    (budgetPage - 1) * itemsPerPage,
    budgetPage * itemsPerPage
  );

  const paginatedExpenses = filteredExpenses.slice(
    (expensePage - 1) * itemsPerPage,
    expensePage * itemsPerPage
  );

  const totalBudgetPages = Math.ceil(budgetDetails.length / itemsPerPage);
  const totalExpensePages = Math.ceil(filteredExpenses.length / itemsPerPage);

  const renderPagination = (currentPage, totalPages, onPageChange) => (
    <Pagination className="mt-3">
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <Pagination.Item active>{currentPage}</Pagination.Item>
      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </Pagination>
  );

  const totalFilteredExpense = filteredExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const totalFilteredBudget =
    filterType === "All"
      ? totalBudget
      : budgetDetails.reduce((sum, b) => sum + b.amount, 0);

  const remainingFilteredBudget = totalFilteredBudget - totalFilteredExpense;

  const pieChartData = (() => {
    const categories = { Transportation: 0, Education: 0, Home: 0, Other: 0 };
    filteredExpenses.forEach((expense) => {
      const catName = expense.categoryId?.name || "Other";
      if (categories.hasOwnProperty(catName)) {
        categories[catName] += expense.amount;
      } else {
        categories.Other += expense.amount;
      }
    });
    return {
      labels: Object.keys(categories),
      datasets: [
        {
          data: Object.values(categories),
          backgroundColor: ["#2D2DDB", "#FFC242", "#02C0FC", "#74D35F"],
        },
      ],
    };
  })();

  const getBarChartData = () => {
    let labels = [];
    let dataMap = {};

    if (filterType === "Weekly") {
      labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      labels.forEach((day) => (dataMap[day] = 0));
      filteredExpenses.forEach((expense) => {
        const day = new Date(expense.date).toLocaleDateString("en-US", { weekday: "long" });
        dataMap[day] += expense.amount;
      });
    } else if (filterType === "Monthly") {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      labels.forEach((month) => (dataMap[month] = 0));
      filteredExpenses.forEach((expense) => {
        const month = new Date(expense.date).toLocaleDateString("en-US", { month: "short" });
        dataMap[month] += expense.amount;
      });
    } else {
      filteredExpenses.forEach((expense) => {
        const date = new Date(expense.date);
        const weekNumber = Math.ceil(date.getDate() / 7);
        const key = `Week ${weekNumber}`;
        dataMap[key] = (dataMap[key] || 0) + expense.amount;
      });
      labels = Object.keys(dataMap);
    }

    return {
      labels,
      datasets: [
        {
          label: "Expenses",
          data: labels.map((label) => dataMap[label]),
          backgroundColor: "#3F57A0",
          borderRadius: {
            topLeft: 10,
            topRight: 10,
            bottomLeft: 0,
            bottomRight: 0,
          },
        },
      ],
    };
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <section className="dashboard-section py-2">
        <div className="container-fluid mt-3">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h2>Dashboard</h2>
            <div className="d-flex align-items-center gap-2">
              <select
                className="form-select d-inline w-auto me-2"
                style={{ backgroundColor: "#F4F1F6" }}
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <ProfileAvtar />
            </div>
          </div>

          {/* Cards */}
          <div className="row g-3 mb-3 mt-3">
            {[
              { label: "Total Budget", value: totalFilteredBudget, className: "text-primary" },
              { label: "Total Expenses", value: totalFilteredExpense, className: "text-danger" },
              { label: "Remaining Budget", value: remainingFilteredBudget, className: "text-success" },
            ].map(({ label, value, className }, i) => (
              <div key={i} className="col-md-6 col-lg-3 col-sm-6">
                <Card className="p-3 shadow-custom" style={{ backgroundColor: "#F4F1F6", border: "none", borderRadius: "10px" }}>
                  <h6>{label}</h6>
                  <h5 className={className}>{formatCurrency(value, getSetting.data.currency)}</h5>
                </Card>
              </div>
            ))}

            <div className="col-sm-6 col-lg-3 col-md-6">
              <Card className="p-3 shadow-custom py-3" style={{ backgroundColor: "#F4F1F6", border: "none", borderRadius: "10px" }}>
                <h6>
                  Saving Goal <br /> Progress
                </h6>
                <ProgressBar
                  now={totalFilteredBudget ? (totalFilteredExpense / totalFilteredBudget) * 100 : 0}
                  label={`${totalFilteredBudget ? Math.round((totalFilteredExpense / totalFilteredBudget) * 100) : 0}%`}
                  variant="success"
                />
              </Card>
            </div>
          </div>

          {/* Charts */}
          <div className="row g-3 mb-2">
            <div className="col-md-6">
              <Card className="p-3 shadow-custom" style={{ backgroundColor: "#F4F1F6", border: "none", borderRadius: "10px", height: "370px" }}>
                <h6 className="mt-2">Expenses Breakdown ({filterType})</h6>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <div style={{ width: "60%", height: "250px", marginTop: "20px" }}>
                    <Doughnut data={pieChartData} options={{ plugins: { legend: { display: false } } }} />
                  </div>
                  <div className="ms-3">
                    <ul className="list-unstyled mb-0">
                      {pieChartData.labels.map((label, index) => (
                        <li key={index} className="d-flex align-items-center mb-2">
                          <span
                            style={{
                              backgroundColor: pieChartData.datasets[0].backgroundColor[index],
                              width: "10px",
                              height: "10px",
                              borderRadius: "2px",
                              display: "inline-block",
                              marginRight: "8px",
                            }}
                          ></span>
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-md-6">
              <Card className="p-3 shadow-custom" style={{ backgroundColor: "#F4F1F6", border: "none", borderRadius: "10px", height: "370px" }}>
                <h6 className="mt-2">Expenses Chart ({filterType})</h6>
                <Bar data={getBarChartData()} style={{ height: "250px", marginTop: "20px" }} />
              </Card>
            </div>
          </div>

          {/* Tables */}
          <div className="row g-3">
            {/* Budget Overview Table */}
            <div className="col-md-6">
              <Card className="p-3 shadow-custom overflow-auto" style={{ backgroundColor: "#F4F1F6", border: "none", borderRadius: "10px" }}>
                <h6>Budget Overview ({filterType})</h6>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Budgeted</th>
                      <th>Spent</th>
                      <th>Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedBudgets.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No budget found
                        </td>
                      </tr>
                    ) : (
                      paginatedBudgets.map((budget) => {
                        const spentInFilter = filteredExpenses
                          .filter((e) => e.categoryId?.name === budget.categoryName)
                          .reduce((sum, e) => sum + e.amount, 0);
                        return (
                          <tr key={budget._id}>
                            <td>{budget.categoryName}</td>
                            <td>{formatCurrency(budget.amount, getSetting.data.currency)}</td>
                            <td>{formatCurrency(spentInFilter, getSetting.data.currency)}</td>
                            <td>{formatCurrency(budget.amount - spentInFilter, getSetting.data.currency)}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
                {totalBudgetPages > 1 && renderPagination(budgetPage, totalBudgetPages, setBudgetPage)}
              </Card>
            </div>

            {/* Expense Log Table */}
            <div className="col-md-6">
              <Card className="p-3 shadow-custom overflow-auto" style={{ backgroundColor: "#F4F1F6", border: "none", borderRadius: "10px" }}>
                <h6>Expense Log ({filterType})</h6>
                <Table striped>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedExpenses.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          No expenses found
                        </td>
                      </tr>
                    ) : (
                      paginatedExpenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>{new Date(expense.date).toISOString().split("T")[0]}</td>
                          <td>{expense.note}</td>
                          <td>{expense.categoryId?.name}</td>
                          <td>{formatCurrency(expense.amount, getSetting.data.currency)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
                {totalExpensePages > 1 && renderPagination(expensePage, totalExpensePages, setExpensePage)}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="expensio-footer" className="bg-dark text-white pt-3">
        <div className="container text-center">
          <hr style={{ borderTop: "2px solid white" }} />
          <p>
            Use of this website constitutes acceptance of the site{" "}
            <Link to="/terms-conditions" className="text-primary text-decoration-underline fw-semibold">
              Terms of Service
            </Link>
          </p>
          <p className="mb-0">&#169; 2025 Expensio – All rights reserved</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Dashboard;
