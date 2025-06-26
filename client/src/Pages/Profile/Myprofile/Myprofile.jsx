import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../../../Api/functions/profileFunction";
import { useAuth } from "../../../Context/AuthProvider";
import { getBudgetDetails } from "../../../Api/functions/budgetFunctions";
import Loader from "../../../Components/Loader";
import MySettingsModal from "../../../Components/MySettingsModal/MySettingsModal";
import AddReviewModal from "../../../Components/AddReviewModal/AddReviewModal";
import UpdateReviewModal from "../../../Components/UpdateReviewModal/UpdateReviewModal";
import {
  createSetting,
  getAllSetting,
} from "../../../Api/functions/settingFunctions";
import formatCurrency from "../../../utils/formatCurrency";
import {
  createReview,
  getUserReview,
} from "../../../Api/functions/reviewFunction";

const Myprofile = () => {
  const [profileData, setProfileData] = useAuth();
  const [loading, setLoading] = useState(true);
  const [budgetDetailsData, setBudgetDetailsData] = useState([]);
  const [totalMonthlySpent, setTotalMonthlySpent] = useState(0);
  const [totalMonthlyRemaining, setTotalMonthlyRemaining] = useState(0);
  const [getSetting, setGetSetting] = useState([]);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false); // Renamed for clarity
  const [showUpdateReviewModal, setShowUpdateReviewModal] = useState(false); // New state
  const [getUserReviewData, setGetUserReview] = useState([]); // Initialize as null

  useEffect(() => {
    getUserReview(setGetUserReview);
  }, []);

  const [settings, setSettings] = useState({
    currency: "INR",
    dailyLimit: "",
    weeklyLimit: "",
    monthlyLimit: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getProfile(setProfileData, setLoading);
    getBudgetDetails((data) => {
      setBudgetDetailsData(data);
      const monthlyBudgets = data.filter(
        (item) => item.frequency === "monthly"
      );
      const spent = monthlyBudgets.reduce(
        (sum, item) => sum + item.totalSpent,
        0
      );
      const remaining = monthlyBudgets.reduce(
        (sum, item) => sum + item.remaining,
        0
      );
      setTotalMonthlySpent(spent);
      setTotalMonthlyRemaining(remaining);
      setLoading(false);
    });
    getAllSetting(setGetSetting);
  }, []);

  useEffect(() => {
    if (getSetting?.data) {
      setSettings({
        currency: getSetting.data.currency || "INR",
        dailyLimit: getSetting.data.dailyLimit || "",
        weeklyLimit: getSetting.data.weeklyLimit || "",
        monthlyLimit: getSetting.data.monthlyLimit || "",
      });
    }
  }, [getSetting]);


  const categoryTotals = {};
  budgetDetailsData.forEach((item) => {
    const category = item.categoryName || "Uncategorized";
    categoryTotals[category] =
      (categoryTotals[category] || 0) + item.totalSpent;
  });

  const topCategory =
    Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSettingsSave = () => {
    const newData = {
      currency: settings.currency,
      dailyLimit: settings.dailyLimit,
      weeklyLimit: settings.weeklyLimit,
      monthlyLimit: settings.monthlyLimit,
    };
    console.log("Saved Settings:", newData);
    createSetting(newData);
    navigate("/dashboard");
    setShowSettingsModal(false);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleAddReviewSubmit = (reviewData) => {
    createReview(reviewData);
    navigate("/dashboard")
    setShowAddReviewModal(false);
  };

  const handleOpenUpdateReviewModal = () => {
    setShowUpdateReviewModal(true);
  };

  const handleCloseReviewModal = () => {
    setShowAddReviewModal(false);
    setShowUpdateReviewModal(false);
  };

  if (loading || !profileData) {
    return (
      <Container
        fluid
        className="py-4"
        style={{ backgroundColor: "#f4f1f6", minHeight: "100vh" }}
      >
        <Loader />
      </Container>
    );
  }

  return (
    <section>
      <Container
        fluid
        className="py-4"
        style={{ backgroundColor: "#f4f1f6", minHeight: "100vh" }}
      >
        <Row className="g-4">
          {/* Sidebar */}
          <Col xs={12} md={4} lg={3}>
            <Card
              className="text-center p-4"
              style={{
                backgroundColor: "#2D80A3",
                border: "none",
                borderRadius: "20px",
                height: "auto",
              }}
            >
              <div
                className="position-relative mx-auto"
                style={{ width: "130px" }}
              >
                <img
                  src={profileData.profilePic}
                  alt="Profile"
                  className="rounded-circle"
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="d-flex flex-column gap-4 justify-content-between text-start mt-4"
                style={{ color: "white", fontSize: "14px" }}
              >
                <div>
                  <p>
                    <strong>Name:</strong> {profileData.fullname}
                  </p>
                  <p>
                    <strong>Email:</strong> {profileData.email}
                  </p>
                  <p>
                    <strong>Number:</strong> {profileData.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {profileData.address}
                  </p>
                </div>

                <div>
                  <Button
                    as={Link}
                    to="/update-password"
                    variant="light"
                    className="w-100 mb-2 rounded-pill"
                  >
                    Change Password
                  </Button>
                  <Button
                    as={Link}
                    to="/edit-profile"
                    variant="light"
                    className="w-100 mb-2 rounded-pill"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    onClick={() => setShowSettingsModal(true)}
                    variant="light"
                    className="w-100 mb-2 rounded-pill"
                  >
                    My Settings
                  </Button>
                  {getUserReviewData?.data ? (
                    <Button
                      onClick={handleOpenUpdateReviewModal}
                      variant="light"
                      className="w-100 rounded-pill"
                    >
                      Update Review
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowAddReviewModal(true)}
                      variant="light"
                      className="w-100 rounded-pill"
                    >
                      Add Review
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </Col>

          {/* Main Content */}
          <Col xs={12} md={8} lg={9}>
            <Card
              className="p-4 mb-4"
              style={{
                backgroundColor: "#E2EBF4",
                border: "none",
                borderRadius: "20px",
              }}
            >
              <h5>Financial Overview</h5>
              <div className="mt-3">
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span>This Month's Spending</span>
                  <span className="fw-bold">
                    {" "}
                    {formatCurrency(
                      totalMonthlySpent,
                      getSetting?.data?.currency
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span>Remaining Budget</span>
                  <span className="fw-bold">
                    {" "}
                    {formatCurrency(
                      totalMonthlyRemaining,
                      getSetting?.data?.currency
                    )}
                  </span>
                </div>
                <div className="d-flex justify-content-between py-2 border-bottom">
                  <span>Top Category</span>
                  <span className="fw-bold">{topCategory}</span>
                </div>
              </div>
            </Card>

            {/* Budget Summary */}
            <Card
              className="p-4"
              style={{
                backgroundColor: "#f4f1f6",
                border: "none",
                borderRadius: "20px",
              }}
            >
              <h5>Last 4 Budget Summary</h5>
              <div className="mt-3">
                {budgetDetailsData.slice(0, 4).map((item, idx) => {
                  const percentageUsed =
                    item.amount > 0
                      ? Math.round((item.totalSpent / item.amount) * 100)
                      : 0;

                  let progressColor = "success";
                  let displayText = `${formatCurrency(
                    item.totalSpent,
                    getSetting?.data?.currency
                  )}/${formatCurrency(
                    item.amount,
                    getSetting?.data?.currency
                  )}`;
                  let percentLabel = `${percentageUsed}%`;

                  if (item.isExceeded) {
                    progressColor = "danger";
                    displayText = `Exceeded ${formatCurrency(
                      item.totalSpent,
                      getSetting?.data?.currency
                    )}/${formatCurrency(
                      item.amount,
                      getSetting?.data?.currency
                    )}`;
                    percentLabel = "100%+";
                  } else if (percentageUsed >= 80) {
                    progressColor = "warning";
                  }

                  return (
                    <div key={idx} className="mb-4">
                      <div className="d-flex justify-content-between">
                        <span>{item.categoryName}</span>
                        <span className="fw-bold">{displayText}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <ProgressBar
                          now={Math.min(percentageUsed, 100)}
                          variant={progressColor}
                          style={{
                            flex: 1,
                            height: "10px",
                            borderRadius: "20px",
                          }}
                        />
                        <span style={{ minWidth: "40px", fontSize: "12px" }}>
                          {percentLabel}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mb-3">
                <Button
                  onClick={handleBackToDashboard}
                  variant="light"
                  className="rounded-pill shadow-sm px-4 py-2"
                  style={{
                    border: "1px solid #ccc",
                    backgroundColor: "#ffffff",
                    color: "#2D80A3",
                    fontWeight: "bold",
                  }}
                >
                  ← Back to Dashboard
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Settings Modal Component */}
        <MySettingsModal
          show={showSettingsModal}
          onHide={() => setShowSettingsModal(false)}
          settings={settings}
          onChange={handleSettingsChange}
          onSave={handleSettingsSave}
        />

        {/* Add Review Modal Component */}
        <AddReviewModal
          show={showAddReviewModal}
          onHide={handleCloseReviewModal}
          onSubmit={handleAddReviewSubmit}
        />

        {/* Update Review Modal Component */}
        <UpdateReviewModal
          show={showUpdateReviewModal}
          onHide={handleCloseReviewModal}
        />
      </Container>
    </section>
  );
};

export default Myprofile;
