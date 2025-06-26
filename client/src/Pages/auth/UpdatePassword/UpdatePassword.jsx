import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./UpdatePassword.css";
import { updatePassword } from "../../../Api/functions/authFunctions";
import Cookies from "js-cookie";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword , setConfirmNewPassword ] = useState("");

  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("auth");
    if (!token) {
      toast.error("Unauthorized! Please login.");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmNewPassword  || !currentPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword !== confirmNewPassword ) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      currentPassword,
      newPassword,
      confirmNewPassword 
    };

    updatePassword(data, navigate, setLoading);
  };

  return (
    <section
      className="updatepassword-section py-5"
      id="updatepassword-section"
      style={{ height: "100vh" }}
    >
      <div className="container update-container">
        <div className="row position-relative d-flex justify-content-center align-items-center updatepassword-row">
          <div
            className="col-lg-6 updatepassword-form-area d-flex justify-content-center align-items-center flex-column"
            id="updatepassword"
          >
            <div className="heading d-flex justify-content-center flex-column">
              <h2 className="upadatepass-title text-center">EXPENSIO</h2>
              <p className="text-center text-secondary sub-text">
                <span className="sub-text fw-semibold fs-5 text-dark">
                  Update Your Password
                </span>
              </p>
            </div>

            <form className="updatepassword-form" onSubmit={handleSubmit}>
              {/* Current Password */}
              <div className="mb-2 position-relative">
                <label
                  htmlFor="currentPassword"
                  className="form-label fw-bolder ms-2"
                >
                  Current Password
                </label>
                <input
                  type={showCurrentPassword ? "text" : "currentPassword"}
                  className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                  id="currentPassword"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <span
                  className="position-absolute end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer", zIndex: 5, top: "70%" }}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <i
                    className={`bi ${
                      showCurrentPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>

              {/* New Password */}
              <div className="mb-2 position-relative">
                <label
                  htmlFor="newPassword"
                  className="form-label fw-bolder ms-2"
                >
                  New Password
                </label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                  id="newPassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  className="position-absolute end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer", zIndex: 5, top: "70%" }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <i
                    className={`bi ${
                      showNewPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>

              {/* Confirm Password */}
              <div className="mb-1 confirm-pass position-relative">
                <label
                  htmlFor="confirmPassword"
                  className="form-label fw-bolder ms-2"
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "confirmNewPassword"}
                  className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <span
                  className="position-absolute end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer", zIndex: 5, top: "70%" }}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  <i
                    className={`bi ${
                      showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  ></i>
                </span>
              </div>

              {/* Submit Button */}
              <div className="d-grid mb-2 mt-4">
                <button
                  type="submit"
                  className="btn btn-warning main-btn rounded-pill fw-bold"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
