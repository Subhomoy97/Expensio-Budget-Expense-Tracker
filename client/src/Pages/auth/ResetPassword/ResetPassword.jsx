import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"; // Make sure to import bootstrap icons
import "./ResetPassword.css"; // Import your CSS file
import {resetPassword} from "../../../Api/functions/authFunctions"

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {token}=useParams()
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      password: newPassword,
      confirmPassword: confirmPassword,
    };
    resetPassword(data, navigate, setLoading, token)
  };

  return (
    <section
      className="updatepassword-section  py-5"
      style={{ height: "100vh" }}
    >
      <div className="container update-container">
        <div className="row position-relative d-flex justify-content-center align-items-center updatepassword-row">
          {/* Left - Form */}
          <div className="col-lg-6  updatepassword-form-area d-flex justify-content-center align-items-center flex-column">
            <div className="heading d-flex justify-content-center flex-column">
              <h2 className="upadatepass-title text-center">EXPENSIO</h2>
              <p className="text-center text-secondary sub-text">
                <span className=" sub-text fw-semibold fs-5 text-dark">
                  Reset Your Password{" "}
                </span>
              </p>
            </div>

            <form className="updatepassword-form " onSubmit={handleSubmit}>
              {/* Password */}
              <div className="mb-2 position-relative">
                <label
                  htmlFor="registerPassword"
                  className="form-label fw-bolder ms-2"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                  id="registerPassword"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  className="position-absolute end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer", zIndex: 5, top: "70%" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  ></i>
                </span>
              </div>

              {/* Confirm Password */}
              <div className="mb-1 confirm-pass position-relative">
                <label
                  htmlFor="registerConfirmPassword"
                  className="form-label fw-bolder ms-2"
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                  id="registerConfirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="position-absolute end-0 translate-middle-y me-3"
                  style={{ cursor: "pointer", zIndex: 5, top: "70%" }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {loading ? "Reseting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
