import React, { useState } from "react";
import "./Register_module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import RegisterImg from "./../../../assets/img/AuthIcon/regImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../../Api/functions/authFunctions";
import axios from "axios";
import Navbar from "../../../Components/nav/Navbar";
import Footer from "../../../Components/Footer";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    const newData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    registerUser(newData, navigate, setLoading);
  };

  // const handleGoogle = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3010/auth/google");
  //     if (res) {
  //       console.log("authGoogle", res);
  //     }
  //   } catch (error) {
  //     console.log("authGoogle",error);
  //   }
  // };

  return (
    <div>
      <Navbar/>
      <section className="register-section py-5" style={{marginTop: "80px"}}>
        <div className="container py-5">
          <div className="row w-100 d-flex justify-content-center align-items-center gap-5">
            {/* Left - Form */}
            <div className="col-lg-6 register-form-area  d-flex justify-content-center align-items-center flex-column">
              {/* Heading */}
              <div className="heading d-flex justify-content-center flex-column mb-1 mt-3">
                {/* <h2 className="register-title text-center ml-2">EXPENSIO</h2> */}
                <p className="sub-text text-center fw-bold">
                  Create your Account
                </p>
              </div>

              <form className="register-form" onSubmit={handleSubmit}>
                <div className="mb-1 d-flex justify-content-between gap-3 register-name-group">
                  <div className="flex-fill">
                    <label
                      htmlFor="registerFirstName"
                      className="form-label fw-bolder ms-2"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                      id="registerFirstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex-fill">
                    <label
                      htmlFor="registerLastName"
                      className="form-label fw-bolder ms-2"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                      id="registerLastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="mb-1" style={{ height: "74px" }}>
                  <label
                    htmlFor="registerEmail"
                    className="form-label fw-bold ms-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                    id="registerEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password */}
                <div className="mb-2 position-relative">
                  <label
                    htmlFor="registerPassword"
                    className="form-label fw-bolder ms-2"
                  >
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control rounded-pill py-2 px-3 bg-secondary-subtle pe-5"
                      id="registerPassword"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      style={{ cursor: "pointer", zIndex: 5 }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={`bi ${
                          showPassword ? "bi-eye-slash" : "bi-eye"
                        }`}
                      ></i>
                    </span>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-1 position-relative confirm-pass">
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control rounded-pill py-2 px-3 bg-secondary-subtle pe-5"
                      id="registerConfirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                    />
                    <span
                      className="position-absolute top-50 end-0 translate-middle-y me-3"
                      style={{ cursor: "pointer", zIndex: 5 }}
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
                </div>

                {/* Terms */}
                <div className="form-check mb-2 d-flex align-items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="registerTermsCheck"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="registerTermsCheck"
                  >
                    <strong>
                      I agree to the <a href="#">Terms & Conditions</a> and the{" "}
                      <a href="#">Privacy Policy</a>
                    </strong>
                  </label>
                </div>

                <div className="d-grid mb-2">
                  <button
                    type="submit"
                    className="btn btn-warning main-btn rounded-pill fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "SIGN UP"}
                  </button>
                </div>

                <p className="text-center d-flex justify-content-start">
                  <strong>Already have an account?</strong>
                  <Link
                    to="/login"
                    className="login text-primary ms-1 fw-semibold"
                  >
                    Login Here
                  </Link>
                </p>
             
              </form>
            </div>
          
           

            {/* Right - Image */}
            <div className="col-lg-6 register-image-area">
              <img
                src={RegisterImg}
                alt="Register Illustration"
                className="w-100 register-img"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Register;
