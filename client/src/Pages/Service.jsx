import React from 'react';
import border from "./../assets/img/banner-border.png"
import img1 from "./../assets/img/service-1.png";
import img2 from "./../assets/img/service-2.png";
import img3 from "./../assets/img/service-3.png";
import img4 from "./../assets/img/service-3.png";
import Navbar from '../Components/nav/Navbar';
import Footer from '../Components/Footer';

const Service = () => {
  return (
    <>
    <Navbar/>
      <div>

        {/* Banner Section */}
        <section className="service-banner p-5 bg-light text-center position-relative  " style={{marginTop: '80px'}}>
            <div className="container">
                <div className="border-image">
                    <h1 className="display-5 fw-bold">Our Services</h1>
                    <img
                      src={border}
                      alt="border"
                      className="img-fluid mt-3"
                      style={{ maxWidth: '100%' }}
                    />
                </div>
            </div>
        </section>


        {/* Part 2 */}
        <section className="py-5">
            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0 rounded">
                <img src={img1} className="img-fluid shadow-custom2 " alt="Smart Expense Tracking" />
                </div>
                <div className="col-lg-6">
                <h5>1. Smart Expense Tracking</h5>
                <p>
                    Automatically categorize and track your spending, link your bank
                    accounts securely to view transactions in real time. Visual
                    dashboard to identify where your money goes.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Part 3 */}
        <section className="py-5 bg-light">
            <div className="container">
            <div className="row align-items-center flex-lg-row-reverse">
                <div className="col-lg-6 mb-4 mb-lg-0">
                <img src={img2} className="img-fluid shadow-custom2" alt="Budget Planning" />
                </div>
                <div className="col-lg-6">
                <h5>2. Personalized Budget Planning</h5>
                <p>
                    Set monthly or custom budgets tailored to your lifestyle.
                    Receive real-time alerts when you’re nearing your budget limits.
                    Adjust categories dynamically as your spending changes.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Part 4 */}
        <section className="py-5">
            <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 mb-4 mb-lg-0">
                <img src={img3} className="img-fluid shadow-custom2" alt="Savings Goals" />
                </div>
                <div className="col-lg-6">
                <h5>3. Savings Goals & Forecasting</h5>
                <p>
                    Create and manage multiple savings goals. Get projections based
                    on your habits and suggested adjustments.
                </p>
                </div>
            </div>
            </div>
        </section>

        {/* Part 5 */}
        <section className="py-5 bg-light">
            <div className="container">
            <div className="row align-items-center flex-lg-row-reverse">
                <div className="col-lg-6 mb-4 mb-lg-0 ">
                <img src={img4} className="img-fluid shadow-custom2" alt="Reports and Insights" />
                </div>
                <div className="col-lg-6">
                <h5>4. Reports & Insights</h5>
                <p>
                    Detailed monthly and annual spending reports. Identify trends
                    and areas for improvement. Export data for personal or
                    professional use.
                </p>
                </div>
            </div>
            </div>
        </section>
      </div>
      <Footer/>
    </>
  );
};

export default Service;
