import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Navbar from "../Components/nav/Navbar";
import Footer from "../Components/Footer";

// home image import
import bannerImage1 from "./../assets/img/homeimg/home1.jpeg";
import bannerImage2 from "./../assets/img/homeimg/home2.jpeg";
import bannerImage3 from "./../assets/img/homeimg/home3.jpeg";

import phoneLeft from "./../assets/img/homeimg/left-phone.png";
import phoneRight from "./../assets/img/homeimg/right-phone.png";
import Vector from "./../assets/img/homeimg/Vector-61.png";


// image import for home
import dashboard from "./../assets/img/homeimg/dashboard.png";
import icon1 from "./../assets/img/homeimg/icon1.png";
import icon2 from "./../assets/img/homeimg/icon2.png";
import icon3 from "./../assets/img/homeimg/icon3.png";

// features image import
import expance from "./../assets/img/homeimg/expance.png";
import budget from "./../assets/img/homeimg/budget.png";
import transction from "./../assets/img/homeimg/transction.png";
import analysis from "./../assets/img/homeimg/analysis.png";
import qr_code from "./../assets/img/homeimg/qr-code.png";
import Loader from "../Components/Loader";
import tick from "./../assets/img/homeimg/right-sign.png";
import { getAllReview } from "../Api/functions/reviewFunction";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activePlan, setActivePlan] = useState("monthly");
  const [allReviewData,setAllReviewData]=useState([])

  useEffect(()=>{
    getAllReview(setAllReviewData)
  },[])
console.log("allReviewData",allReviewData);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  const pricing = {
    monthly: {
      basic: 0,
      stater: 99,
      premium: 199,
      period: "/ per month",
    },
    yearly: {
      basic: 0,
      stater: 999,
      premium: 1999,
      period: "/ per year",
    },
  };


  // Reusable fade-up component
const FadeUpOnView = ({ children, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};


  return (
    <>
      <Navbar />

      <section style={{ marginTop: "80px" }}>
      <div className="container-fluid px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="banner-slide position-relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.58), rgba(0,0,0,0.5)), url(${bannerImage1})`,
              }}
            >
              <FadeUpOnView className="banner-content text-white fade-up">
                <h1>
                  Take Control Of Your <br /> Financial Life
                </h1>
                <p>
                  Managing your money shouldn’t be complicated. With our
                  Expense Tracker and Budget Planner, you can record your
                  daily spending, set monthly limits, and see exactly where
                  your money goes.
                </p>
                <button className="btn main-btn">Get Started</button>
              </FadeUpOnView>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide className="banner2-vector">
            <div
              className="banner-slide"
              style={{
                background: `url(${Vector})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                padding: "60px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div className="container phone-area d-flex flex-column flex-lg-row align-items-center justify-content-between gap-2">
                <div className="d-flex phonearea justify-content-center gap-3">
                  <img
                    src={phoneLeft}
                    alt="Phone Left"
                    style={{
                      maxWidth: "180px",
                      height: "400px",
                      transform: "rotate(-5deg)",
                    }}
                  />
                  <img
                    src={phoneRight}
                    alt="Phone Right"
                    style={{ maxWidth: "200px", height: "400px" }}
                  />
                </div>
                <FadeUpOnView
                  className="text-center text-lg-start px-3 fade-up"
                  style={{ maxWidth: "500px" }}
                >
                  <h1
                    style={{
                      fontWeight: 700,
                      color: "#2b2b2b",
                      fontSize: "2rem",
                    }}
                    className="d-none d-lg-block"
                  >
                    Take Control Of Your <br /> Financial Life
                  </h1>
                  <p
                    style={{
                      color: "#555",
                      marginTop: "15px",
                      fontSize: "1rem",
                    }}
                    className="d-none d-lg-block"
                  >
                    A simple, clean way to stay on top of your personal
                    spending and budgeting. Track your expenses, monitor trends,
                    and reach your financial goals faster — all in one app.
                  </p>
                  <button className="btn main-btn mt-3">Get Started</button>
                </FadeUpOnView>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div
              className="banner-slide position-relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.58), rgba(0,0,0,0.5)), url(${bannerImage2})`,
              }}
            >
              <div className="pointer-area position-absolute">
                <h3 className="pointer-text">Act Smart <br /> Today</h3>
              </div>
              <FadeUpOnView className="banner-content banner-content2 text-white fade-up">
                <h1 className="d-flex flex-column align-items-center">
                  Earn <div>+</div> Manage <div>+</div> Save
                </h1>
                <button className="btn main-btn">Get Started</button>
              </FadeUpOnView>
            </div>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <div
              className="banner-slide position-relative"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.58), rgba(0, 0, 0, 0.71)), url(${bannerImage3})`,
              }}
            >
              <FadeUpOnView className="banner-content text-white fade-up">
                <h1>
                  Take Control Of Your <br /> Financial Life
                </h1>
                <p>
                  Take control of your finances with a tool designed to make
                  budgeting simple. Whether you're saving for a goal or just
                  trying to keep your expenses in check, our planner helps you
                  track every transaction and stay on top of your spending
                  habits.
                </p>
                <button className="btn main-btn">Get Started</button>
              </FadeUpOnView>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      </section>


      {/* manage your money */}
      <section className="manage-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">A Smarter Way To Manage Your Money</h2>
            <p className="text-muted">
              Expensio helps you control spending, track expenses and set budget
              with an intuitive financial dashboard
            </p>
          </div>

          <div className="row align-items-center">
            <div className="manage-card col-lg-6 mb-4 mb-lg-0 text-center">
              <img
                src={dashboard}
                alt="Dashboard"
                className="img-fluid rounded shadow-custom2 w-100"
              />
            </div>

            <div className="col-lg-6">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item mb-3" style={{backgroundColor: "#CFE2FF"}}>
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed d-flex align-items-center"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                      style={{backgroundColor: "#CFE2FF"}}
                    >
                      <img src={icon1} alt="icon" className="me-2" width="30" />
                      User - Friendly Design
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text.
                    </div>
                  </div>
                </div>

                <div className="accordion-item mb-3" style={{backgroundColor: "#CFE2FF"}}>
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed d-flex align-items-center"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      style={{backgroundColor: "#CFE2FF"}}
                    >
                      <img src={icon2} alt="icon" className="me-2" width="30" />
                      Personalized Savings Goals
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text.
                    </div>
                  </div>
                </div>

                <div className="accordion-item" style={{backgroundColor: "#CFE2FF"}}>
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button d-flex align-items-center"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                      style={{backgroundColor: "#CFE2FF"}}
                    >
                      <img src={icon3} alt="icon" className="me-2" width="30" />
                      Automated Budget and Expense Forecasting
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* Features section */}
      <section className=" featured-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Powerful Features To Elevate Your Expense</h2>
            <p className="text-muted">
              All the tools you need to manage your money – smart , simple
            </p>
          </div>

          <div className="row g-4">

            <div className="col-md-6 col-lg-6">
              <div className="card featured-card p-4 bg-white rounded shadow-custom h-100">
                <h5 className="fw-semibold">Expenses</h5>
                <p className="text-muted">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <img
                  src={expance}
                  alt="Expenses"
                  className="img-fluid shadow-custom2 rounded"
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="card featured-card p-4 bg-white rounded shadow-custom h-100">
                <h5 className="fw-semibold">Budgets</h5>
                <p className="text-muted">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <img
                  src={budget}
                  alt="Budgets"
                  className="img-fluid shadow-custom2 rounded"
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="card featured-card p-4 bg-white rounded shadow-custom h-100">
                <h5 className="fw-semibold">Transactions</h5>
                <p className="text-muted">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <img
                  src={transction}
                  alt="Transactions"
                  className="img-fluid shadow-custom2 rounded"
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-6">
              <div className="card featured-card p-4 bg-white rounded shadow-custom h-100">
                <h5 className="fw-semibold">Analysis</h5>
                <p className="text-muted">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <img
                  src={analysis}
                  alt="Analysis"
                  className="img-fluid shadow-custom2 rounded"
                />
              </div>
            </div>

          </div>
        </div>
      </section>




      {/* animation section */}
      <div className="expensio-section d-flex align-items-center">
        <div className="marquee-container">
          <div className="marquee-track">
            <div className="marquee-content">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i}>EXPENSIO</span>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* price plan section*/}
      <section className="priceplan-section">
        <div className="container py-5 text-center">
          <h3 className="fw-bold mb-2">Choose Your Right Plan</h3>
          <p className="text-muted mb-4">Find the might plan that fits you</p>

          {/* Toggle Slider */}
          <div className="plan-toggle-wrapper position-relative d-inline-flex bg-light rounded-pill p-1 mb-5">
            <div
              className="slider-bg position-absolute rounded-pill transition-all"
              style={{
                left: activePlan === "monthly" ? "0%" : "50%",
                width: "50%",
                height: "100%",
                backgroundColor: "#0d6efd",
                zIndex: 0,
                transition: "left 0.3s",
              }}
            />
            <button
              className={`btn btn-sm px-4 fw-bold z-1 ${
                activePlan === "monthly" ? "text-white" : "text-dark"
              }`}
              onClick={() => setActivePlan("monthly")}
            >
              Monthly
            </button>
            <button
              className={`btn btn-sm px-4 ms-4 text-end fw-bold z-1 ${
                activePlan === "yearly" ? "text-white" : "text-dark"
              }`}
              onClick={() => setActivePlan("yearly")}
            >
              Yearly
            </button>
          </div>

          <div className="row justify-content-center g-4">
            {/* Basic Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card p-4 h-100">
                <h5>Basics</h5>
                <p className="text-muted small">
                  Essential features, unbeatable value.
                </p>
                <h2 className="fw-bold">
                  ${pricing[activePlan].basic}{" "}
                  <span className="fs-6 text-muted">
                    {pricing[activePlan].period}
                  </span>
                </h2>
                <ul className="list-unstyled mt-4 text-start">
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> All Free Trial features
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Real-time transaction
                    tracking
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Monthly expenses reports
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> In-app customer support
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> No setup fees
                  </li>
                </ul>
                <button className="btn main-btn mt-4 w-100 rounded-pill">
                  Get Started
                </button>
              </div>
            </div>

            {/* Popular Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card p-4 h-100 position-relative border-primary border-2 shadow">
                <span className="badge bg-primary position-absolute shadow-custom top-0 start-50 translate-middle px-3 py-2 rounded-pill">
                  Popular
                </span>
                <h5 className="mt-4">Starter</h5>
                <p className="text-muted small">
                  Essential features, unbeatable value.
                </p>
                <h2 className="fw-bold">
                  ${pricing[activePlan].stater}{" "}
                  <span className="fs-6 text-muted">
                    {pricing[activePlan].period}
                  </span>
                </h2>
                <ul className="list-unstyled mt-4 text-start">
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> All basic plan features
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Advanced budgeting tools
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Priority customer
                    support
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Transactions tracking
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Customizable categories
                  </li>
                </ul>
                <button className="btn main-btn mt-4 w-100 rounded-pill">
                  Get Started
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="col-lg-4 col-md-6">
              <div className="pricing-card p-4 h-100">
                <h5>Premium</h5>
                <p className="text-muted small">
                  Essential features, unbeatable value.
                </p>
                <h2 className="fw-bold">
                  ${pricing[activePlan].premium}{" "}
                  <span className="fs-6 text-muted">
                    {pricing[activePlan].period}
                  </span>
                </h2>
                <ul className="list-unstyled mt-4 text-start">
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> All basic plan features
                    included
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Priority 24/7 support
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Detailed expense
                    analysis
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Priority customer
                    support
                  </li>
                  <li>
                    {" "}
                    <img src={tick} alt="right-sign" /> Multi-currency support
                  </li>
                </ul>
                <button className="btn main-btn mt-4 w-100 rounded-pill">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* main faqs */}
      <section>
        <div className="container py-5">
          <h3 className="text-center fw-bold">Frequently Asked Questions</h3>
          <p className="text-center text-muted mb-4">
            Find answers to common questions about our website
          </p>

          <div className="accordion" id="faqAccordion">
            <div className="accordion-item" style={{backgroundColor: "#CFE2FF"}}>
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button custom-accordion collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  style={{backgroundColor: "#CFE2FF"}}
                >
                  1. Do I need to link all my bank account and cards to use
                  Expensio?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </div>
              </div>
            </div>

            <div className="accordion-item" style={{backgroundColor: "#CFE2FF"}}>
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button custom-accordion collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{backgroundColor: "#CFE2FF"}}
                >
                  2. How long does it take to set up my Expensio account?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  Setup is quick and simple. You can get started in just a few
                  minutes!
                </div>
              </div>
            </div>

            <div className="accordion-item" style={{backgroundColor: "#CFE2FF"}}>
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button custom-accordion collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                  style={{backgroundColor: "#CFE2FF"}}
                >
                  3. Can Expensio handle transactions in multiple category?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body text-muted small">
                  Yes, Expensio supports multiple categories and custom tags.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App QR Code section */}
      <section  className="qrcode-section">
        <div className="container my-4" >
          <div className="p-4 qrcode-area rounded-4 bg-light shadow-sm d-flex flex-column flex-md-row justify-content-between align-items-center" 
            style={{backgroundColor: "#D3E6FF"}}
          >
            {/* Text Content */}
            <div className="col-lg-8 text-center text-md-start mb-3 mb-md-0">
              <h5 className="fw-bold mb-2">
                Upgrade Your Financial Experience Today
              </h5>
              <p className="mb-3 text-secondary small">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <a href="#" className="fw-bold text-decoration-none text-primary">
                Download Now &rarr;
              </a>
            </div>

            {/* QR Code */}
            <div className="col-lg-4 text-center">
              <img
                src={qr_code}
                alt="QR Code"
                className="img-fluid"
                style={{ maxWidth: "220px" }}
              />
              <div className="small text-primary mt-1">Scan to download</div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
        <div
          className="section review-section py-5"
          style={{
            // backgroundColor: "#e6f3ff", 
            position: "relative",
          }}
        >
          <div className="container">
            <div className="row align-items-center">
              {/* Review Cards Column */}
              <div className="col-md-7">
                <Swiper
                  direction="vertical"
                  slidesPerView={1}
                  centeredSlides={true}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[Autoplay]}
                  className="review-swiper"
                >
                  {allReviewData.map((review, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="bg-white rounded-4 shadow-sm p-4 mb-4"
                        style={{
                          borderLeft: "6px solid #007bff",
                          maxWidth: "100%",
                        }}
                      >
                        <p className="text-secondary mb-2">
                          {review.comment.length > 200
                            ? review.comment.substring(0, 200) + "..."
                            : review.comment}
                        </p>
                        <p className={`fw-bold mb-1 ${review.color}`}>{review.name}</p>
                        <div>
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`me-1 ${
                                i < review.rating ? "text-warning" : "text-muted"
                              }`}
                              style={{ fontSize: "1rem" }}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Right Content Column */}
              <div className="col-md-5 mt-4 mt-md-0 text-center text-md-start">
                <h3 className="fw-bold mb-3 text-dark">What Our Users are saying</h3>
                <p className="text small mb-4">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the
                  1500s, when an unknown printer took a galley of type and scrambled it to
                  make a type specimen book. It has survived not only five centuries.
                </p>
                {/* <button className="btn main-btn rounded-pill px-4 py-2 fw-semibold">
                  View More
                </button> */}
              </div>
            </div>
          </div>
        </div>


      <Footer />
    </>
  );
};

export default Home;
