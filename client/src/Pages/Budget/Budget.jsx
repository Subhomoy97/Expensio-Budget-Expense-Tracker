import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  ProgressBar,
  Modal,
  Alert,
} from "react-bootstrap";
import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import AddBudgetModal from "./AddBudgetModal/AddBudgetModal";
import EditBudgetModal from "./EditBudgetModal/EditBudgetModal";
import {
  deleteBudget,
  getBudgetDetails,
} from "../../Api/functions/budgetFunctions";
import Loader from "../../Components/Loader";
import { getAllSetting } from "../../Api/functions/settingFunctions";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

const Budget = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);
  const [getSetting, setGetSetting] = useState([]);

  const fetchBudgetData = () => {
    setLoading(true);
    getBudgetDetails((data) => {
      setBudgetDetails(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchBudgetData();
    getAllSetting(setGetSetting);
  }, []);

  const getVariant = (percentage) => {
    if (percentage === 100) return "danger";
    if (percentage > 80) return "warning";
    if (percentage < 60) return "success";
    return "primary";
  };

  const handleEllipsisClick = (index) => {
    setActionMenuIndex((prev) => (prev === index ? null : index));
  };

  const handleEdit = (item) => {
    setSelectedBudget(item);
    setShowEditModal(true);
    setActionMenuIndex(null);
  };

  const promptDelete = (item) => {
    setBudgetToDelete(item);
    setShowConfirmModal(true);
    setActionMenuIndex(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteBudget(budgetToDelete._id);
      fetchBudgetData();
    } catch (error) {
      console.error("Failed to delete budget item:", error);
    } finally {
      setShowConfirmModal(false);
      setBudgetToDelete(null);
    }
  };

  // Filter data by frequency
  const dailyData = budgetDetails.filter((item) => item.frequency === "daily");
  const weeklyData = budgetDetails.filter(
    (item) => item.frequency === "weekly"
  );
  const monthlyData = budgetDetails.filter(
    (item) => item.frequency === "monthly"
  );

  // Calculate sums
  const totalDailyBudget = dailyData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalWeeklyBudget = weeklyData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalMonthlyBudget = monthlyData.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const totalMonthlySpent = monthlyData.reduce(
    (sum, item) => sum + item.totalSpent,
    0
  );
  const totalMonthlyRemaining = monthlyData.reduce(
    (sum, item) => sum + item.remaining,
    0
  );

  // New calculations: Remaining daily and weekly budgets
  const totalDailySpent = dailyData.reduce(
    (sum, item) => sum + item.totalSpent,
    0
  );
  const totalDailyRemaining = dailyData.reduce(
    (sum, item) => sum + item.remaining,
    0
  );

  const totalWeeklySpent = weeklyData.reduce(
    (sum, item) => sum + item.totalSpent,
    0
  );
  const totalWeeklyRemaining = weeklyData.reduce(
    (sum, item) => sum + item.remaining,
    0
  );
  const renderBudgetItem = (item, idx) => {
    const { categoryName, totalSpent, amount } = item;
    const percentage = Math.min(Math.round((totalSpent / amount) * 100), 100);
    const variant = getVariant(percentage);
    const isOverBudget = totalSpent > amount;

    return (
      <div
        key={idx}
        className="d-flex align-items-start gap-4 w-100 mb-4 position-relative"
      >
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <span>{categoryName}</span>
            <span>
              {formatCurrency(totalSpent, getSetting.data?.currency)}/
              {formatCurrency(amount, getSetting.data?.currency)} ({percentage}
              %)
            </span>
          </div>

          {isOverBudget && (
            <Alert variant="danger" className="py-1 px-2 mt-2 mb-1">
              <strong>Alert:</strong> You’ve exceeded the budget for this
              category!
            </Alert>
          )}

          <ProgressBar
            now={percentage}
            variant={variant}
            label={`${percentage}%`}
            visuallyHidden
          />
        </div>

        <div className="position-relative">
          <i
            className="fa-solid fa-ellipsis cursor-pointer"
            onClick={() => handleEllipsisClick(idx)}
            style={{ cursor: "pointer" }}
          ></i>

          {actionMenuIndex === idx && (
            <div
              className="position-absolute bg-white shadow rounded p-2 d-flex flex-column"
              style={{ top: "25px", right: "0", zIndex: 10 }}
            >
              <div
                className="d-flex align-items-center text-primary mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              >
                <i className="fa-solid fa-pen-to-square me-2"></i>
                <span>Edit</span>
              </div>
              <div
                className="d-flex align-items-center text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => promptDelete(item)}
              >
                <i className="fa-solid fa-trash me-2"></i>
                <span>Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <section className="budget-section">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold m-0">Budget</h4>
            <ProfileAvtar />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <Row className="g-3 mb-4">
                {/* Existing cards */}
                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Total Budget</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalMonthlyBudget +
                          totalWeeklyBudget +
                          totalDailyBudget,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">Overall</span>
                  </Card>
                </Col>

                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Total Monthly Budget</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalMonthlyBudget,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">Monthly</span>
                  </Card>
                </Col>

                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Total Weekly Budget</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalWeeklyBudget,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">Weekly</span>
                  </Card>
                </Col>

                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Total Daily Budget</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalDailyBudget,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">Daily</span>
                  </Card>
                </Col>

                {/* New remaining budget cards */}
                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Total Spent</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalMonthlySpent,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">
                      Monthly Budgets Only
                    </span>
                  </Card>
                </Col>
                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Remaining Monthly Budget</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalMonthlyRemaining,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">Monthly</span>
                  </Card>
                </Col>

                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Remaining Weekly Budget</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalWeeklyRemaining,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">Weekly</span>
                  </Card>
                </Col>

                <Col md={6} lg={3}>
                  <Card className="p-3 text-center shadow-custom">
                    <small>Remaining Daily Budget</small>
                    <h5 className="fw-bold mt-2">
                      {formatCurrency(
                        totalDailyRemaining,
                        getSetting.data?.currency
                      )}
                    </h5>
                    <span className="text-muted small">Daily</span>
                  </Card>
                </Col>
              </Row>

              <div className="d-flex justify-content-end align-items-center mb-3">
                <Button
                  variant="primary"
                  className="shadow-custom main-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  + Add Budget
                </Button>
              </div>

              <Card className="p-3 mb-4 shadow-custom">
                <h5>Daily Budget Overview</h5>
                {dailyData.length === 0 ? (
                  <p className="text-muted">No daily budget data available.</p>
                ) : (
                  dailyData.map((item, idx) => renderBudgetItem(item, idx))
                )}
              </Card>

              <Card className="p-3 mb-4 shadow-custom">
                <h5>Weekly Budget Overview</h5>
                {weeklyData.length === 0 ? (
                  <p className="text-muted">No weekly budget data available.</p>
                ) : (
                  weeklyData.map((item, idx) =>
                    renderBudgetItem(item, idx + dailyData.length)
                  )
                )}
              </Card>

              <Card className="p-3 shadow-custom">
                <h5 className="mb-3">Monthly Budget Overview</h5>
                {monthlyData.length === 0 ? (
                  <p className="text-muted">
                    No monthly budget data available.
                  </p>
                ) : (
                  monthlyData.map((item, idx) =>
                    renderBudgetItem(
                      item,
                      idx + dailyData.length + weeklyData.length
                    )
                  )
                )}
              </Card>
            </>
          )}
        </div>
      </section>

      <footer id="expensio-footer" className="bg-dark text-white pt-3">
        <div className="container text-center">
          <hr style={{ borderTop: "2px solid white" }} />
          <p>
            Use of this website constitutes acceptance of the site{" "}
            <Link to="/terms-conditions" className="text-primary text-decoration-underline fw-semibold">
              Terms of Service
            </Link>
          </p>
          <p className="mb-0">\u00a9 2025 Expensio – All rights reserved</p>
        </div>
      </footer>

      <AddBudgetModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onBudgetAdded={fetchBudgetData}
      />

      {selectedBudget && (
        <EditBudgetModal
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBudget(null);
          }}
          onBudgetUpdated={fetchBudgetData}
          budgetItem={selectedBudget}
        />
      )}

      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this budget item?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Budget;
