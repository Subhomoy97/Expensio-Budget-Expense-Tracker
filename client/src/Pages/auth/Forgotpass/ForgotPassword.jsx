import React, { useState } from "react";
import "./Forgot_module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { forgotPassword } from "../../../Api/functions/authFunctions";
import { useNavigate } from "react-router-dom";
import Footer from "../../../Components/Footer";
import Navbar from "../../../Components/nav/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email };
    forgotPassword(data, navigate, setLoading);
  };

 
  return (
    <div>
      <Navbar/>
      <section
        className="forgotpassword-section w-100 py-5 px-0"
        style={{marginTop: "80px"}}
      >
        <div className="container py-5 ">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-6 forgotfrom-area d-flex justify-content-center  flex-column">
              <div className="heading d-flex justify-content-center flex-column mb-3">
                {/* <h2 className="forgot-title text-center">EXPENSIO</h2> */}
                <p className="text-center text-secondary sub-text">
                  <span className="sub1 text-dark fw-semibold">
                    Forgot your password{" "}
                  </span>
                  <span className="sub2 d-none">Login to your Account </span>
                </p>
              </div>

              <form className="forgot-form" onSubmit={handleSubmit}>
                <div className="mb-4 input-area1">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-bolder ms-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-pill py-2 px-3 bg-secondary-subtle"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                 
                  />
                  <p className="error mailError"></p>
                </div>

                <input
                  type="submit"
                  className="form-control main-btn rounded-4 py-2 px-3 fw-semibold"
                  value={loading ? "Sending..." : "FORGOT PASSWORD"}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default ForgotPassword;
