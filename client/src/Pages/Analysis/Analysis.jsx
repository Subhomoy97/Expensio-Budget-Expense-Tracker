import React, { useEffect, useState, useMemo } from "react";
import { Card } from "react-bootstrap";
import { Pie, Bar, Line } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";
import "chart.js/auto";
import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import { getAllExpense } from "../../Api/functions/expencseFunctions";
import { getAllBudget, getBudgetDetails } from "../../Api/functions/budgetFunctions";
import { Link } from "react-router-dom";

const Analysis = () => {
  const [expensesData, setExpensesData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);
  const [totalBudget, setTotalBudget] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState("monthly");
  const [budgetDetails, setBudgetDetails] = useState([]);



  useEffect(() => {
    getAllExpense(setExpensesData, setTotalExpense);
    getAllBudget(setTotalBudget, setBudgetData);
    getBudgetDetails(setBudgetDetails);
  }, []);

  const filteredBudgetDetails = useMemo(() => {
    return budgetDetails.filter(item => item.frequency === selectedFrequency);
  }, [budgetDetails, selectedFrequency]);

  const dynamicLineLabels = useMemo(() => {
    return filteredBudgetDetails.map((item) => item.categoryName);
  }, [filteredBudgetDetails]);

  const budgetAmountData = useMemo(() => {
    return filteredBudgetDetails.map((item) => item.amount);
  }, [filteredBudgetDetails]);

  const totalSpentData = useMemo(() => {
    return filteredBudgetDetails.map((item) => item.totalSpent);
  }, [filteredBudgetDetails]);

  console.log("Filtered Budget Details:", filteredBudgetDetails);

  const dynamicBudgetLineData = {
    labels: dynamicLineLabels,
    datasets: [
      {
        label: "Budget",
        data: budgetAmountData,
        borderColor: "#00C8FF",
        backgroundColor: "#00C8FF",
      },
    ],
  };

  const dynamicExpenseLineData = {
    labels: dynamicLineLabels,
    datasets: [
      {
        label: "Total Spent",
        data: totalSpentData,
        borderColor: "#1E1E99",
        backgroundColor: "#1E1E99",
      },
    ],
  };


  const expenseByCategory = useMemo(() => {
    const totals = {};
    expensesData.forEach((exp) => {
      const categoryName = exp.categoryId?.name || "Uncategorized";
      totals[categoryName] = (totals[categoryName] || 0) + exp.amount;
    });
    return totals;
  }, [expensesData]);

  const budgetByCategory = useMemo(() => {
    const totals = {};
    budgetData.forEach((budget) => {
      const categoryName = budget.categoryId?.name || "Uncategorized";
      totals[categoryName] = (totals[categoryName] || 0) + budget.amount;
    });
    return totals;
  }, [budgetData]);


  const allCategories = useMemo(() => {
    const categories = new Set([
      ...Object.keys(budgetByCategory),
      ...Object.keys(expenseByCategory),
    ]);
    return Array.from(categories);
  }, [budgetByCategory, expenseByCategory]);

  const barData = {
    labels: allCategories,
    datasets: [
      {
        label: "Budget",
        data: allCategories.map((cat) => budgetByCategory[cat] || 0),
        backgroundColor: "#FFC107",
      },
      {
        label: "Expense",
        data: allCategories.map((cat) => expenseByCategory[cat] || 0),
        backgroundColor: "#E040FB",
      },
    ],
  };

  const barOptions = {
    indexAxis: "y",
    plugins: { legend: { display: false } },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { callback: (v) => "$" + v },
      },
    },
  };

  const pieData = useMemo(() => {
    const labels = Object.keys(expenseByCategory);
    const data = Object.values(expenseByCategory);
    const backgroundColors = [
      "#FF5722",
      "#FF9800",
      "#FFC107",
      "#FFCD88",
      "#FFB855",
      "#B37626",
      "#F4C78B",
      "#FFE492",
      "#8E44AD",
      "#3498DB",
      "#2ECC71",
      "#E74C3C",
      "#95A5A6",
      "#34495E",
      "#16A085",
    ];
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: labels.map(
            (_, index) => backgroundColors[index % backgroundColors.length]
          ),
          borderWidth: 0,
        },
      ],
    };
  }, [expenseByCategory]);

  const pieOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            let label = context.label || "";
            let value = context.parsed || 0;
            return `${label}: $${value}`;
          },
        },
      },
    },
    cutout: "0%",
    responsive: true,
    maintainAspectRatio: false,
  };


  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Category",
          font: { size: 14 },
        },
        grid: { display: true },
      },
      y: {
        title: {
          display: true,
          text: "Amount",
          font: { size: 14 },
        },
        beginAtZero: true,
        grid: { display: true },
      },
    },
    elements: {
      point: {
        radius: 5,
        backgroundColor: "#333",
      },
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
    },
  };




  const ratio =
    totalBudget && totalExpense ? (totalExpense / totalBudget) * 100 : 0;
  const savings =
    totalBudget && totalExpense
      ? ((totalBudget - totalExpense) / totalBudget) * 100
      : 0;

  return (
    <Layout>
      <section className="py-4 analysis-section">
        <div className="container-fluid">
          <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
            <h4>Analysis</h4>
            <ProfileAvtar />
          </div>

          <div className="row g-3">
            <div className="col-lg-2">
              <Card
                className="text-center p-3 mb-3 shadow-custom"
                style={{
                  height: "118px",
                  backgroundColor: "#F4F1F6",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <small>Total Budget</small>
                <h5 className="fw-bold mt-2">${totalBudget}</h5>
              </Card>
              <Card
                className="text-center p-3 shadow-custom"
                style={{
                  height: "118px",
                  backgroundColor: "#F4F1F6",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <small>Total Expense</small>
                <h5 className="fw-bold mt-2">${totalExpense}</h5>
              </Card>
            </div>

            <div className="col-lg-2 d-flex flex-column gap-3">
              <Card
                className="text-center p-2 shadow-custom"
                style={{
                  backgroundColor: "#F4F1F6",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <small className="fw-bold">Budget to Expense Ratio</small>
                <GaugeChart
                  id="gauge-chart1"
                  nrOfLevels={3}
                  colors={["#FF5722", "#FFEB3B", "#00E676"]}
                  arcWidth={0.3}
                  percent={ratio / 100}
                  textColor="#000"
                  formatTextValue={() => `${Math.round(ratio)}%`}
                />
              </Card>
              <Card
                className="text-center p-2 shadow-custom"
                style={{
                  backgroundColor: "#F4F1F6",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <small className="fw-bold">Savings Rate</small>
                <GaugeChart
                  id="gauge-chart2"
                  nrOfLevels={3}
                  colors={["#FF5722", "#FFEB3B", "#00E676"]}
                  arcWidth={0.3}
                  percent={savings / 100}
                  textColor="#000"
                  formatTextValue={() => `${Math.round(savings)}%`}
                />
              </Card>
            </div>

            <div className="col-lg-8">
              <div className="row g-3">
                <div className="col-md-6">
                  <Card
                    className="p-3 d-flex justify-content-center align-items-center shadow-custom"
                    style={{
                      backgroundColor: "#F4F1F6",
                      border: "none",
                      borderRadius: "10px",
                    }}
                  >
                    <h6 className="mb-3">Expense Breakdown by Category</h6>
                    <div style={{ height: "185px", width: "200px" }}>
                      <Pie data={pieData} options={pieOptions} />
                    </div>
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card
                    className="p-3 shadow-custom"
                    style={{
                      height: "255px",
                      backgroundColor: "#F4F1F6",
                      border: "none",
                      borderRadius: "10px",
                    }}
                  >
                    <h6 className="mb-3">Budget Compliance</h6>
                    <Bar
                      data={barData}
                      options={barOptions}
                      style={{ height: "200px" }}
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-1 mt-5" style={{ maxWidth: "120px" }}>
            <select
              id="frequency-select"
              className="form-select"
              style={{ fontWeight: "bold" }}
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
            >
              <option value="daily" >Daily</option>
              <option value="weekly" >Weekly</option>
              <option value="monthly" >Monthly</option>
            </select>
          </div>
          <div className="row g-3 mt-3">
            <div className="col-md-6">
              <Card
                className="p-3 shadow-custom "
                style={{
                  backgroundColor: "#F4F1F6",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <h6 className="mb-3">Budget LineData ({selectedFrequency})</h6>
                {filteredBudgetDetails.length > 0 ? (
                  <Line data={dynamicBudgetLineData} options={lineOptions} />
                ) : (
                  <p className="text-muted">No budget data available for this frequency.</p>
                )}
              </Card>
            </div>

            <div className="col-md-6">
              <Card
                className="p-3 shadow-custom"
                style={{
                  backgroundColor: "#F4F1F6",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                <h6 className="mb-3">Expense LineData ({selectedFrequency})</h6>
                {filteredBudgetDetails.length > 0 ? (
                  <Line data={dynamicExpenseLineData} options={lineOptions} />
                ) : (
                  <p className="text-muted">No expense data available for this frequency.</p>
                )}
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

export default Analysis;
