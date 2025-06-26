import React from 'react';
import border from "./../assets/img/banner-border.png"
import whoWeAreImg from './../assets/img/abt-1.png';
import vectorImg from './../assets/img/Vector.png';
import ourApproachImg from './../assets/img/abt-2.png';
import whyUsImg from './../assets/img/abt-3.png' ;
import icon1 from './../assets/img/acor-1.png';
import icon2 from './../assets/img/acor-2.png';
import icon3 from './../assets/img/acor-3.png';
import icon4 from './../assets/img/acor-4.png';
import Navbar from '../Components/nav/Navbar';
import Footer from '../Components/Footer';

const About = () => {
  return (
    <>
      <Navbar/>
      {/* Banner Section */}
      <section className="about-banner p-5 bg-light text-center position-relative  " style={{marginTop: '80px'}}>
        <div className="container">
          <div className="border-image">
            <h1 className="display-5 fw-bold">About Us</h1>
            <img
              src={border}
              alt="border"
              className="img-fluid mt-3"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </section>
      {/* Who We Are */}
      <section className="about-content py-5">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-md-6 order-md-1 order-2">
              <h5>Who We Are</h5>
              <p>
                We are dedicated to helping individuals and families take
                control of their personal finances. Our mission is to provide a
                simple, effective and user-friendly tool for managing expenses
                and budgets.
              </p>
            </div>
            <div className="abt-img1 col-md-6 order-md-2 order-1 mb-4 mb-md-0">
              <img src={whoWeAreImg} className="img-fluid" alt="Who We Are" />
            </div>
          </div>
          
        </div>
        <div className="position-absolute w-100  d-none d-md-block" style={{ zIndex: -1, top: "85%" }}>
          <img src={vectorImg} alt="Vector" className="img-fluid" />
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="abt-img2 col-md-6 mb-4 mb-md-0">
              <img src={ourApproachImg} className="img-fluid shadow-custom2" alt="Our Approach" />
            </div>
            <div className="col-md-6">
              <h5>Our Approach</h5>
              <p>
                We believe that tracking expenses and planning budgets should be
                accessible to everyone. Our app combines powerful features with
                an intuitive interface to make financial management as easy as
                possible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <h5 className="ms-2 mb-3">Why Choose Us?</h5>
                <div className="accordion" id="whyChooseAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <img src={icon1} alt="icon" className="me-2" width="30" />
                        User-Friendly Design
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#whyChooseAccordion"
                    >
                      <div className="accordion-body">
                        Our intuitive UI ensures you can manage your finances without confusion.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <img src={icon2} alt="icon" className="me-2" width="30" />
                        Easy Access & Engagement
                      </button>
                    </h2>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#whyChooseAccordion"
                    >
                      <div className="accordion-body">
                        Access your budget on-the-go and stay engaged with your financial goals.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <img src={icon3} alt="icon" className="me-2" width="30" />
                        Customize Category
                      </button>
                    </h2>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#whyChooseAccordion"
                    >
                      <div className="accordion-body">
                        Tailor categories to your lifestyle and track what matters most to you.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <img src={icon4} alt="icon" className="me-2" width="30" />
                        Security & Privacy
                      </button>
                    </h2>
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#whyChooseAccordion"
                    >
                      <div className="accordion-body">
                        Your data is encrypted and protected with industry-standard security practices.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="abt-img3 col-md-6">
              <img src={whyUsImg} className="img-fluid w-100" alt="Why Choose Us" />
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default About;
