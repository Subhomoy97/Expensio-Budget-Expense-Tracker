import React, { useState, useEffect } from "react";
import "./Login_module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginImg from "./../../../assets/img/AuthIcon/loginsite.png";
import homeArrow from "./../../../assets/img/Arrow.png"
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Api/functions/authFunctions";
import { useAuth } from "../../../Context/AuthProvider";
import Cookies from "js-cookie";
import Navbar from "../../../Components/nav/Navbar";
import Footer from "../../../Components/Footer";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = Cookies.get("rememberedEmail");
    const remember = Cookies.get("rememberMe");
    if (remember === "true" && savedEmail) {
      setFormData((prevData) => ({ ...prevData, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      Cookies.set("rememberedEmail", formData.email, { expires: 7 });
      Cookies.set("rememberMe", "true", { expires: 7 });
    } else {
      Cookies.remove("rememberedEmail");
      Cookies.remove("rememberMe");
    }
    const data = { email: formData.email, password: formData.password };
    login(data, navigate, setLoading, auth, setAuth);
  };

  return (
    <div>
      <Navbar/>
      <section className="login-section position-relative py-5" style={{marginTop: "80px"}}>
        <div className="container py-5">
          {/* <div className="position-absolute " style={{left: "25px", top: "20px", transform: "rotate(270deg)"}}>
            <Link to="/">
             <img src={homeArrow} alt={homeArrow} style={{height: "40px", width: "40px"}} />
            </Link>
          </div> */}
          <div className="row w-100 d-flex justify-content-center align-items-center gap-5">
            <div className="col-md-6 loginimg_area">
              <img src={LoginImg} className="w-100 login_img" alt="Login Illustration" />
            </div>

            <div className="col-lg-6 login-form-area">
              <div className="heading d-flex justify-content-center flex-column mb-3">
                {/* <h2 className="expensioo text-center">EXPENSIO</h2> */}
                <p className="text-center text-secondary sub-text">
                  {/* <span className="sub1">Enter your email and password to access your account</span> */}
                  <span className="sub2 ">Login to your Account</span>
                </p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="mb-4 input-area1">
                  <label htmlFor="email" className="form-label fw-bolder ms-2">Email</label>
                  <input type="email" name="email" className="form-control rounded-pill py-2 px-3 bg-secondary-subtle" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                  <p className="error mailError"></p>
                </div>

                <div className="mb-3 input-area2 position-relative">
                  <label htmlFor="password" className="form-label fw-bolder ms-2">Password</label>
                  <input type={showPassword ? "text" : "password"} name="password" className="form-control rounded-pill py-2 px-3 bg-secondary-subtle" id="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                  <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute end-0 translate-middle-y me-3`} role="button" aria-label={showPassword ? "Hide password" : "Show password"} style={{ cursor: "pointer", top: "54%" }} onClick={() => setShowPassword(!showPassword)}></i>
                  <p className="error passError mb-1"></p>
                  <div className="d-flex justify-content-end">
                    <Link to="/forgot-password" className="forgot text-primary fw-bold">Forgot Password?</Link>
                  </div>
                </div>

                <div className="mb-2 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                  <label className="form-check-label fw-semibold" htmlFor="rememberMe">Remember me</label>
                </div>

                <input type="submit" className="form-control main-btn rounded-4 py-2 px-3 fw-semibold" value={loading ? "Logging in..." : "LOG IN"} disabled={loading} />

                <div className="d-flex justify-content-between align-items-center mt-4 new-user">
                  <div className="fw-normal">
                    <strong>New User?</strong> <Link to="/register" className="sign text-primary fw-bolder">Sign up</Link>
                  </div>
                  <div className="terms-links text-end">
                    <Link to="/terms-conditions" className="text-primary fw-medium me-2">Terms & Conditions</Link> |
                    <Link to="/privacy" className="text-primary fw-medium ms-2">Privacy Policy</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Login;
