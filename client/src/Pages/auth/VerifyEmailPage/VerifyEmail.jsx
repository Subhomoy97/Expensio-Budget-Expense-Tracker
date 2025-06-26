import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetOTP, verifyOtp } from "../../../Api/functions/authFunctions";
import { toast } from "react-toastify";
import bgImage from "./../../../assets/img/AuthIcon/Group12.jpg";
import envalop from "./../../../assets/img/AuthIcon/envalop.png";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([false, false, false, false]);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const navigate = useNavigate();
  const inputRefs = Array(4)
    .fill(null)
    .map(() => useRef(null));

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleChange = (index, value) => {
    if (!/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const newErrors = [...errors];
    newErrors[index] = false;
    setErrors(newErrors);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs[index - 1].current.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{4}$/.test(pastedData)) return;

    setOtp(pastedData.split(""));
    setErrors([false, false, false, false]);
    inputRefs[3].current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (otp.includes("")) {
      setErrors(otp.map((digit) => digit === ""));
      toast.error("Please enter the full OTP");
      return;
    }

    const enteredOtp = otp.join("");
    const data = { email, otp: enteredOtp };
    console.log(data);

    setLoading(true);
    verifyOtp(data, navigate, setLoading);
  };

  const otpResent = () => {
    console.log("email:", email);
    const data={
      email:email
    }
    resetOTP(data,setLoading);
    setTimer(60);
    setIsTimerActive(true);
  };

  return (
    <section
      className="verifyemail-section py-5 px-0"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100dvh",
      }}
    >
      <div className="container otp-container d-flex justify-content-center align-items-center">
        <div
          className="p-4 rounded w-100 shadow text-center otp-form d-flex flex-column justify-content-center"
          style={{
            maxWidth: "480px",
            backgroundColor: "rgba(187, 205, 154, 0.49)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.37)",
          }}
        >
          <div className="heading d-flex justify-content-center flex-column mb-3">
            <h2 className="expensioo text-center">EXPENSIO</h2>
            <h5 className="mb-3">OTP Verification</h5>
          </div>

          <div
            style={{
              backgroundColor: "#FEFACE",
              height: "74px",
              width: "74px",
            }}
            className="envelop d-flex justify-content-center align-items-center mb-1 rounded-circle mx-auto d-none"
          >
            <img
              src={envalop}
              alt="envelop"
              className="mt-3"
              style={{ height: "44px", width: "44px" }}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-center gap-2 my-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  maxLength="1"
                  className={`form-control text-center ${
                    errors[index] ? "border-danger" : ""
                  }`}
                  style={{ width: "50px", fontSize: "1.5rem" }}
                />
              ))}
            </div>

            <div
              className="d-flex justify-content-center align-items-center flex-column"
              style={{ marginTop: "-16px" }}
            >
              <p className="text-danger" style={{ fontSize: "14px" }}>
                {errors.some((error) => error) && "Please enter the full OTP"}
              </p>
              <p>Didn’t receive OTP?</p>
              {isTimerActive ? (
                <p
                  className="text-muted"
                  style={{ fontSize: "16px", fontWeight: "bold" }}
                >
                  Resend OTP in {timer}s
                </p>
              ) : (
                <button
                  type="button"
                  className="btn btn-link text-decoration-none"
                  onClick={otpResent}
                  style={{
                    color: "#9c27b0",
                    fontWeight: "bold",
                    fontSize: "16px",
                    marginTop: "-15px",
                    marginBottom: "10px",
                    textDecoration: "underline",
                  }}
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              className="btn main-btn w-100 fw-semibold"
              disabled={loading}
              style={{
                backgroundColor: "#9c27b0",
                border: "none",
                color: "black",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#7b1fa2")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#9c27b0")
              }
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 5px #9c27b0")
              }
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
